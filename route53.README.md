## Route53 nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "Route53Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/route53.template",
        "TimeoutInMinutes": "60",
        "Parameters": {
          "Environment": {
            "Ref": "Environment"
          },
          "ServiceName": {
            "Ref": "ServiceName"
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