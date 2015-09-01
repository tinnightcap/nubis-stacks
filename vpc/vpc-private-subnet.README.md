## VPC Private Subnet Nested Stack

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
    "PrivateSubnetStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "vpc/vpc-private-subnet.template" ] ] },
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
          "PrivateSubnetAZ1Cidr": {
            "Ref": "PrivateSubnetAZ1Cidr"
          },
          "PrivateSubnetAZ2Cidr": {
            "Ref": "PrivateSubnetAZ2Cidr"
          },
          "PrivateSubnetAZ3Cidr": {
            "Ref": "PrivateSubnetAZ3Cidr"
          },
          "SSHKeyName": {
            "Ref": "SSHKeyName"
          },
          "PublicSubnetAZ1": {
            "Ref": "PrivateSubnetAZ2Cidr"
          },
          "PublicSubnetAZ2": {
            "Ref": "PrivateSubnetAZ2Cidr"
          },
          "PublicSubnetAZ3": {
            "Ref": "PrivateSubnetAZ3Cidr"
          },
          "InternetAccessSecurityGroup": {
            "Ref": "InternetAccessSecurityGroup"
          }
        }
      }
    }
```
