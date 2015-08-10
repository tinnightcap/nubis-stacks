## IAM instance profile stack

To use this stack you will need to set the required input parameter to include the stack as a resource

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
    "IAMRoleStack": {
        "Type": "AWS::CloudFormation::Stack",
        "Properties": {
            "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "iam-instance-profile.template" ] ] },
            "TimeoutInMinutes": "60",
            "Parameters": {
                "IAMRoles": { "Fn::GetAtt": [ "MyStackThatReturnsAnIAMRole", "Outputs.IAMRole"] }
            }
        }
    }
```

#### Return values

* `IAMInstanceProfileName` - Name of IAM instance profile which you can then reference to on your EC2 instance
