## Route53 nested stack

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
    "Route53Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "route53.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "DNSName": {
            "Ref": "AWS::StackName"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "BaseZone": {
            "Ref": "BaseZone"
          },
          "ELBStack": {
            "Fn::GetAtt": [
              "ELBStack",
              "Outputs.DNSName"
            ]
          }
        }
      }
    }
  }
```