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
        "SearchString": {
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
To deploy this function you need to first ensure the IAM roll was created. Then deploy the function to Lambda.

All of these instructions assume you have set up the AWS cli tools and that you are operating from the top level folder of this repository.

### Upload Lambda Function
Now that the role is in place, all that is left is to bundle and upload the lambda function. 

#### Generate Bundle
First create a zip file bundle of the function and any required dependencies:
```bash
cd lambda/LookupNestedStackOutputs; zip LookupNestedStackOutputs.zip index.js; cd ../../
```

#### Upload Bundle
You will use the AWS cli tool to upload the bundle to Lambda.

##### Set up
Start by setting the profile and region, NOTE: If you have not set up any profiles set this to '*default*'. These commands assume that you have set up your profile names the same as the account names. The stack name is assumed:
```bash
PROFILE='nubis-lab'; REGION='us-west-2'
```

##### Gather ARN
You will need to get the arn of the roll that was created with the lambda-roll stack. Conveniently it was set as a stack output. We will set this as an environment variable:
```bash
NESTED_STACK=$(aws cloudformation describe-stack-resources --region $REGION --profile $PROFILE --stack-name "$REGION-vpc" --query 'StackResources[?LogicalResourceId==`VPCMetaStack`].PhysicalResourceId' --output text); echo $NESTED_STACK
LAMBDA_ROLL_ARN=$(aws cloudformation describe-stacks --region $REGION --profile $PROFILE --stack-name $NESTED_STACK --query 'Stacks[*].Outputs[?OutputKey == `IamRollArn`].OutputValue' --output text); echo $LAMBDA_ROLL_ARN
```

##### Upload
Then using the roll arn we set in the environment variable, upload the bundle to Lambda:
```bash
aws lambda upload-function --region $REGION --profile $PROFILE --function-name LookupNestedStackOutputs --function-zip lambda/LookupNestedStackOutputs/LookupNestedStackOutputs.zip --runtime nodejs --role ${LAMBDA_ROLL_ARN} --handler index.handler --mode event --timeout 10 --memory-size 128 --description 'Gather outputs from Cloudformation enviroment specific nested stacks to be used in other Cloudformation stacks'
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
    "SearchString": "meta"
  }
}
```

#### Delete Function
Just in case you wish to remove the function yo can do so (just be sure to remove the nubis-lambda-roll stack after if you no longer need it):
```bash
aws lambda delete-function --function-name LookupNestedStackOutputs
```
