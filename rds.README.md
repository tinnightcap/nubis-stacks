## RDS nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "RDSStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/rds.template",
        "TimeoutInMinutes": "60",
        "Parameters": {
          "ServiceName": {
            "Ref": "AWS::StackName"
          },
          "TechnicalOwner": {
            "Ref": "TechnicalOwner"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "VpcId": {
            "Ref": "VpcId"
          },
          "Subnets": {
            "Fn::Join": [
              ",",
              {
                "Ref": "Subnets"
              }
            ]
          },
          "ProjectName": {
            "Ref": "ProjectName"
          },
          "EC2SecurityGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.EC2SecurityGroup"
            ]
          }
        }
      }
    }
```