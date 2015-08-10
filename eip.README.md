## EIP nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example input definition
```json
    "StacksVersion": {
      "Description": "Version of the Nubis Stacks",
      "Type": "String",
      "Default": "v1.0.0"
    },
```
#### Example resource definition
```json
    "EIPStack": {
        "Type": "AWS::CloudFormation::Stack",
        "Properties": {
            "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "eip.template" ] ] },
            "TimeoutInMinutes": "60",
            "Parameters": {
                "StackName": {
                    "Ref": "AWS::StackName"
                }
            }
        }
    }
```

#### Output values
* `ElasticIP` - Returns EIP allocation ID

* `IAMRole` - Returns name of the IAM role

#### Notes
* This stack requires the `--capabilities CAPABILITY_IAM` flag when calling aws cli
