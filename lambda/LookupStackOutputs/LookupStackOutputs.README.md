# LookupStackOutputs

This is a simple script designed to run under the [AWS Lambda](http://aws.amazon.com/lambda/) framework. This is based on a [walkthrough](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources-lambda.html) on using Lambda custom resources in cloudformation templates.

This script & resource will take all outputs from the named stack and provide them as a lookup parameters.

## Usage
To use this resource in cloudformation, first declare a custom resource:

```json
"VpcInfo": {
  "Type": "Custom::VpcInfo",
  "Properties": {
    "ServiceToken": { "Fn::Join": [ "", [ "arn:aws:lambda:", { "Ref": "AWS::Region" }, ":", { "Ref": "AWS::AccountId" }, ":function:", "LookupStackOutputs" ] ] },
    "StackName": {
      "Fn::Join": [
        "-",
        [
          {
            "Ref": "AWS::Region"
          },
          {
            "Ref": "Environment"
          },
          "vpc"
        ]
      ]
    },
  }
},
```

Then you can access the outputs from the named stack, a Nubis VPC Stack in this example, to use in your other resources:

```json
"VpcId": {
  "Fn::GetAtt": [
    "VpcInfo",
    "VpcId"
  ]
},
```

## Deploy
To deploy this function you need to do two things. First create an IAM role for which allows Lambda to access your stack outputs. Second deploy the function to Lambda.

All of these instructions assume you have set up the AWS cli tools and that you are operating from the top level folder of this repository.

### Create IAM Role
We will create the roll as a stack.

#### Create Stack
To create the Lambda Roll stack simply:
```bash
aws cloudformation create-stack --stack-name nubis-lambda-roll --template-body file://lambda/lambda-roll.template --capabilities CAPABILITY_IAM
```

#### Update Stack
To update the Lambda Roll stack:
```bash
aws cloudformation update-stack --stack-name nubis-lambda-roll --template-body file://lambda/lambda-roll.template --capabilities CAPABILITY_IAM
```

#### Delete Stack
Finally, if you wish to delete the stack you would:
```bash
aws cloudformation delete-stack --stack-name nubis-lambda-roll
```

### Upload Lambda Function
Now that the role is in place, all that is left is to bundle and upload the lambda function.

#### Generate Bundle
First create a zip file bundle of the function and any required dependencies:
```bash
cd lambda/LookupStackOutputs; zip -r LookupStackOutputs.zip . -i \*.js; cd ../../
```

#### Upload Bundle
You will use the AWS cli tool to upload the bundle to Lambda.

You will need to get the arn of the roll that was created with the lambda-roll stack. Conveniently it was set as a stack output. We will set this as an environment variable:
```bash
LAMBDA_ROLL_ARN=$(aws cloudformation describe-stacks --stack-name nubis-lambda-roll --query 'Stacks[*].Outputs[?OutputKey == `IamRollArn`].OutputValue' --output text)
```

Then using the roll arn we set in the environment variable, upload the bundle to Lambda:
```bash
aws lambda upload-function --region us-west-2 --function-name LookupStackOutputs --function-zip lambda/LookupStackOutputs/LookupStackOutputs.zip --runtime nodejs --role ${LAMBDA_ROLL_ARN} --handler LookupStackOutputs.handler --mode event --timeout 10 --memory-size 128 --description 'Gather outputs from Cloudformation stacks to be used in other Cloudformation stacks'
```

If everything worked as expected you should see some output similar to this:
```json
{
    "FunctionName": "LookupStackOutputs",
    "CodeSize": 1397,
    "ConfigurationId": "92c44c94-b648-423c-ab6f-79db6fef7930",
    "MemorySize": 128,
    "FunctionARN": "arn:aws:lambda:us-west-2:647505682097:function:LookupStackOutputs",
    "Handler": "LookupStackOutputs.handler",
    "Role": "arn:aws:iam::647505682097:role/nubis-lambda-roll-LambdaIamRole-15M0SCFBIWYQE",
    "Mode": "event",
    "Timeout": 10,
    "LastModified": "2015-04-21T21:23:48.304+0000",
    "Runtime": "nodejs",
    "Description": "Gather outputs from Cloudformation stacks to be used in other Cloudformation stacks"
}
```
#### Test Function
To test the function log into the AWS web consol, navigate to [Lambda](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions), select your function and enter the following into the 'Sample Event' input box (You may need to select your region and adjust the StackName):


```json
{
  "ResourceProperties": {
    "StackName": "us-west-2-sandbox-vpc"
  }
}
```

#### Delete Function
Just in case you wish to remove the function yo can do so (just be sure to remove the nubis-lambda-roll stack first if you no longer need it):
```bash
aws lambda delete-function --function-name LookupStackOutputs
```

#### Local development
To local development on your lambda function you would need to install a couple of things

* Make sure you have `npm` installed, mac users can install it using [homebrew](http://brew.sh/) and there is a nice doc for linux users [here](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)

* Install `node-lambda` globally

    ```bash
    $ npm install -g node-lambda
    ```

* Create a folder for your lambda function or use the current directory that you are in to develop your script

* Create a `package.json` file (note: Dependency '*' means that it will install the latest version)

    ```json
    {
        "name": "LookupStackOutputs",
        "version": "0.0.1",
        "description": "Looks up stack outputs",
        "main": "LookupStackOutputs.js",
        "author": "nubis",
        "license": "MPL"
        "dependencies": {
            "aws-sdk": "*"
        }
    }
    ```

* Run `npm install` in the current directory to install the package dependency

* Run `node-lambda setup` in the current directory to setup the project, it will generate 3 files `event.json`, `deploy.env` and `.env`. The file we really care about is `event.json` and `.env`
    * `event.json` - where you mock your event
    * `.env` - where you place your deployment configuration

* If node fails to run with the error:
    > '/usr/bin/env: node: No such file or directory'

    * You can fix this error by doing the following

        ```bash
        ln -s /usr/bin/nodejs /usr/bin/node
        ```

* At this point its probably a good idea to create a gitignore to ignore some of the files

    ```bash
    $ echo ".env\ndeploy.env\nevent.json" >> .gitignore
    $ echo "node_modules" >> .gitignore
    ```

* Edit `event.json` to fit your need

* Now you are ready to test your code, you can test your code by running the `node-lambda run` command

### References
* http://radify.io/blog/aws-lambda-workflow/

* https://github.com/joyent/node/wiki/installing-node.js-via-package-manager

* https://github.com/RebelMail/node-lambda

* https://www.npmjs.com/package/node-lambda
