## ec2 nested stack

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
    "EC2Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "ec2.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "StackName": {
            "Ref": "AWS::StackName"
          },
          "ServiceName": {
            "Ref": "ServiceName"
          },
          "TechnicalOwner": {
            "Ref": "TechnicalOwner"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "AmiId": {
            "Ref": "AmiId"
          },
          "SSHKeyName": {
            "Ref": "SSHKeyName"
          },
          "ProjectName": {
            "Ref": "ProjectName"
          },
          "SubnetLocation": {
            "Ref": "SubnetLocation"
          },
          "ELB": {
            "Fn::GetAtt": [
              "ELBStack",
              "Outputs.ELB"
            ]
          }
        }
      }
    }
```
