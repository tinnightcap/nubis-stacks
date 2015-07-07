## RDS nested stack

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
    "RDSStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "rds-postgres.template" ] ] },
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
          "AllocatedStorage": "15",
          "DBInstanceClass": "db.t1.micro",
          "DBName": "MyDb",
          "EC2SecurityGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.EC2SecurityGroup"
            ]
          }
        }
      }
    }
    }
`
