/**
 * A Lambda function that takes an AWS CloudFormation stack name and environment
 * and returns the outputs of the environment specific nested stack
 **/

exports.handler = function(event, context) {

    console.log("\nREQUEST RECEIVED:\n", JSON.stringify(event));

    if (event.RequestType == "Delete") {
        sendResponse(event, context, "SUCCESS");
        return;
    }

    var stackName = event.ResourceProperties.StackName;
    var searchString = event.ResourceProperties.SearchString;
    var test = event.ResourceProperties.Test;
    var responseStatus = "FAILED";
    var responseData = {};

    // Verifies that a stack name was passed
    if (!stackName) {
        responseData = {Error: "You must provide a StackName when calling this function"};
        console.log(responseData.Error);
        sendResponse(event, context, responseStatus, responseData);
    }
    // Verifies that a search string name was passed
    if (!searchString) {
        responseData = {Error: "You must provide a SearchString when calling this function"};
        console.log(responseData.Error);
        sendResponse(event, context, responseStatus, responseData);
    }

    // Build case insensitive regex for searching for the search string
    var regex = new RegExp(searchString, 'i');

    var aws = require("aws-sdk");
    var cfn = new aws.CloudFormation();

    // Look up the name of the nested stack corresponding to the search string
    function lookupNestedStack(callback) {
        cfn.describeStackResources({StackName: stackName}, function (err, data){
            if(err) {
                responseData = {Error: "DescribeStackResources call failed"};
                console.log(responseData.Error + ":\n", err);
            }
            else {
                // Loop through all resources in the stack one at a time
                // This will exit with the first nested stack name that matches the given search string
                for (var i = 0; i < data.StackResources.length; i++) {
                    // Pull in the resource Id
                    // arn:aws:cloudformation:us-east-1:177680776199:stack/us-east-1-vpc-ProdVPCStack-18VJXHIHCNTAH/e4675490-4b42-11e5-a12c-50d5017c76e0
                    var physicalResouceId = data.StackResources[i].PhysicalResourceId;
                    // Split based on the standard delimiter
                    // http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
                    var stack = physicalResouceId.split("/");
                    // Check to see if the stack matches the search string we are interested in
                    if (stack[1].search(regex) != -1) {
                        nestedStack = stack[1];
                        console.log("\nLOOKUP PAYLOAD:\n", nestedStack);
                        callback();
                    }
                }
            }
        });
    }
    function logStack() {
        // Calls CloudFormation DescribeStacks
        cfn.describeStacks({StackName: nestedStack}, function(err, data) {
            if (err) {
                responseData = {Error: "DescribeStacks call failed"};
                console.log(responseData.Error + ":\n", err);
            }
            // Populates the return data with the outputs from the specified stack
            else {
                responseStatus = "SUCCESS";
                data.Stacks[0].Outputs.forEach(function(output) {
                    responseData[output.OutputKey] = output.OutputValue;
                });
            }
            console.log("\nRESPONSE PAYLOAD:\n", responseData);
            sendResponse(event, context, responseStatus, responseData);
        });
    }

lookupNestedStack(logStack);

};

//Sends response to the pre-signed S3 URL
function sendResponse(event, context, responseStatus, responseData) {
   var responseBody = JSON.stringify({
        Status: responseStatus,
        Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
        PhysicalResourceId: context.logStreamName,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
        Data: responseData
    });

    console.log("\nRESPONSE BODY:\n", responseBody);

    if ( event.ResponseURL ) {
        var https = require("https");
        var url = require("url");

        var parsedUrl = url.parse(event.ResponseURL);
        var options = {
            hostname: parsedUrl.hostname,
            port: 443,
            path: parsedUrl.path,
            method: "PUT",
            headers: {
                "content-type": "",
                "content-length": responseBody.length
            }
        };

        var request = https.request(options, function(response) {
            console.log("STATUS: " + response.statusCode);
            console.log("HEADERS: " + JSON.stringify(response.headers));
            // Tell AWS Lambda that the function execution is done
            context.done();
        });

        request.on("error", function(error) {
            console.log("sendResponse Error:\n", error);
            // Tell AWS Lambda that the function execution is done
            context.done();
        });

        // write data to request body
        request.write(responseBody);
        request.end();
    }
    else {
        context.succeed(responseData);
    }
}
