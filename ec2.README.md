## ec2 nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "EC2Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/ec2.template",
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
          "AmiId": {
            "Ref": "AmiId"
          },
          "KeyName": {
            "Ref": "KeyName"
          },
          "ProjectName": {
            "Ref": "ProjectName"
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