# LookupNestedStackOutputs

This is a script designed to run under the [AWS Lambda](http://aws.amazon.com/lambda/) framework. This is based on a [walkthrough](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources-lambda.html) on using Lambda custom resources in cloudformation templates.

This script & resource will take all outputs from the named stack plus environment and provide them as lookup parameters.

## Usage
To use this resource in cloudformation, first declare a custom resource:

```json
    "VpcInfo": {
      "Type": "Custom::VpcInfo",
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
              "LookupNestedStackOutputs"
            ]
          ]
        },
        "StackName": {
          "Fn::Join": [
            "-",
            [
              {
                "Ref": "AWS::Region"
              },
              "vpc"
            ]
          ]
        },
        "Environment": {
          "Ref": "Environment"
        }
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
aws cloudformation create-stack --region us-west-2 --profile sandbox --stack-name nubis-lambda-roll --template-body file://lambda/lambda-roll.template --capabilities CAPABILITY_IAM
```

#### Update Stack
To update the Lambda Roll stack:
```bash
aws cloudformation update-stack --region us-west-2 --profile sandbox --stack-name nubis-lambda-roll --template-body file://lambda/lambda-roll.template --capabilities CAPABILITY_IAM
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
cd lambda/LookupNestedStackOutputs; zip LookupNestedStackOutputs.zip index.js; cd ../../
```

#### Upload Bundle
You will use the AWS cli tool to upload the bundle to Lambda.

You will need to get the arn of the roll that was created with the lambda-roll stack. Conveniently it was set as a stack output. We will set this as an environment variable:
```bash
LAMBDA_ROLL_ARN=$(aws cloudformation describe-stacks --region us-west-2 --profile sandbox --stack-name nubis-lambda-roll --query 'Stacks[*].Outputs[?OutputKey == `IamRollArn`].OutputValue' --output text)
```

Then using the roll arn we set in the environment variable, upload the bundle to Lambda:
```bash
aws lambda upload-function --region us-west-2 --profile sandbox --function-name LookupNestedStackOutputs --function-zip LookupNestedStackOutputs.zip --runtime nodejs --role ${LAMBDA_ROLL_ARN} --handler index.handler --mode event --timeout 10 --memory-size 128 --description 'Gather outputs from Cloudformation enviroment specific nested stacks to be used in other Cloudformation stacks'
```

If everything worked as expected you should see some output similar to this:
```json
{
    "FunctionName": "LookupNestedStackOutputs", 
    "CodeSize": 1891, 
    "ConfigurationId": "8716646e-5066-4684-872e-f632b2e933cf", 
    "MemorySize": 128, 
    "FunctionARN": "arn:aws:lambda:us-east-1:177680776199:function:LookupNestedStackOutputs", 
    "Handler": "index.handler", 
    "Role": "arn:aws:iam::177680776199:role/nubis-lambda-roll-LambdaIamRole-1SOCG76WQ33X5", 
    "Mode": "event", 
    "Timeout": 10, 
    "LastModified": "2015-08-26T22:47:49.103+0000", 
    "Runtime": "nodejs", 
    "Description": "Gather outputs from Cloudformation enviroment specific nested stacks to be used in other Cloudformation stacks"
}
```
#### Test Function
To test the function log into the AWS web consol, navigate to [Lambda](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions), select your function and enter the following into the 'Sample Event' input box (You may need to select your region and adjust the StackName):


```json
{
  "ResourceProperties": {
    "StackName": "us-west-2-vpc",
    "Environment": "sandbox"
  }
}```

#### Delete Function
Just in case you wish to remove the function yo can do so (just be sure to remove the nubis-lambda-roll stack after if you no longer need it):
```bash
aws lambda delete-function --function-name LookupNestedStackOutputs
```
