# UUID

This is a simple script designed to run under the [AWS Lambda](http://aws.amazon.com/lambda/) framework.

This script & resource will provide access to UUID (unique IDs) from within CloudFormation

## Usage
To use this resource in cloudformation, first declare a custom resource:

```json
    "MyUUID": {
      "Type": "Custom::UUID",
      "Properties": {
        "ServiceToken": {
          "Fn::Join": [
            "",
            [
              "arn:aws:lambda:",
              {
                "Ref": "AWS::Region"
              },
              ":",
              {
                "Ref": "AWS::AccountId"
              },
              ":function:",
              "UUID"
            ]
          ]
        }
      }
    },
```

Then you can access the UUID from your stack:

```json
"Name": {
  "Fn::GetAtt": [
    "MyUUID",
    "uuid"
  ]
},
```

## Deploy
To deploy this function you need to do deploy it to Lambda

### Upload Lambda Function
You need to bundle and upload the lambda function.

#### Retrieve Node dependencies
First, pull down the needed node depencencies
```bash
cd lambda/UUID; npm install; cd ../..

#### Generate Bundle
Create a zip file bundle of the function and any required dependencies:
```bash
cd lambda/UUID; zip -r UUID.zip index.js node_modules; cd ../../
```

#### Upload Bundle
You will use the AWS cli tool to upload the bundle to Lambda.

First, we will set some environment variable:
```bash
REGION='us-west-2';PROFILE='sandbox';
```

Then, upload the bundle to Lambda:
```bash
aws lambda upload-function --region $REGION --profile $PROFILE --function-name UUID --function-zip lambda/UUID/UUID.zip --runtime nodejs --handler index.handler --mode event --timeout 10 --memory-size 128 --description 'Generate UUIDs for use in Cloudformation stacks'
```

If everything worked as expected you should see some output similar to this:
```json
{
    "FunctionName": "UUID",
    "CodeSize": 1397,
    "ConfigurationId": "92c44c94-b648-423c-ab6f-79db6fef7930",
    "MemorySize": 128,
    "FunctionARN": "arn:aws:lambda:us-west-2:647505682097:function:UUID",
    "Handler": "UUID.handler",
    "Mode": "event",
    "Timeout": 10,
    "LastModified": "2015-04-21T21:23:48.304+0000",
    "Runtime": "nodejs",
    "Description": "Generate UUIDs for use in Cloudformation stacks"
}
```
#### Test Function
To test the function log into the AWS web consol, navigate to [Lambda](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions), select your function and enter the following into the 'Sample Event' input box (You may need to select your region and adjust the StackName):


```json
{
  "ResourceProperties": {
  }
}
```

#### Delete Function
Just in case you wish to remove the function yo can do so (just be sure to remove the nubis-lambda-roll stack first if you no longer need it):
```bash
aws lambda delete-function --function-name UUID
```
