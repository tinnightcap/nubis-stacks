## VPC Public Subnet Nested Stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example input definition
```json
    "StacksVersion": {
      "Description": "Version of Nubis Stacks to use for the nested stacks.",
      "Type": "String",
      "Default": "v1.0.0"
    },
```

#### Example resource definition
```json
    "PublicSubnetStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "vpc/vpc-public-subnet.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "VpcId": {
            "Ref": "NubisVpc"
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
          "PublicSubnetAZ1Cidr": {
            "Ref": "PublicSubnetAZ1Cidr"
          },
          "PublicSubnetAZ2Cidr": {
            "Ref": "PublicSubnetAZ2Cidr"
          },
          "PublicSubnetAZ3Cidr": {
            "Ref": "PublicSubnetAZ3Cidr"
          }
        }
      }
    }
```
