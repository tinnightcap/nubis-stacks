## Memcache nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "MemcacheStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/memcache.template",
        "TimeoutInMinutes": "60",
        "Parameters": {
          "ServiceName": {
            "Ref": "ServiceName"
          },
          "TechnicalOwner": {
            "Ref": "TechnicalOwner"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "EC2SecurityGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.GroupId"
            ]
          }
        }
      }
    }
```