## VPC Stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example input definition
```json
    "StacksVersion": {
      "Description": "Version of Nubis Stacks to use for the nested stacks.",
      "Type": "String",
      "Default": "v1.0.0"
    },
```

### Stack options
This stack creates the VPC and a set of public subnets in three seperate availability zones. This template can also create some optional resources; private subnets with nat instances and a vpn connection.

To enable creation of the private subnets and their associated nat instances you must provide the three PrivateSubnetAZXCidr inputs. Omitting any one of them will disable private subnet creation.

To enable creation of the vpn connection you must provide the IPSecTunnelTarget input. Omitting this input will disable vpn creation. You must create the private subnets in order to create the vpn connection.

#### Example resource definition
```json
    "VPCStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "vpc/vpc-private-subnet.template" ] ] },
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
          "StacksVersion": {
            "Ref": "StacksVersion"
          },
          "VpcCidr": {
            "Ref": "VpcCidr"
          },
          "PublicSubnetAZ1Cidr": {
            "Ref": "PublicSubnetAZ1Cidr"
          },
          "PublicSubnetAZ2Cidr": {
            "Ref": "PublicSubnetAZ2Cidr"
          },
          "PublicSubnetAZ3Cidr": {
            "Ref": "PublicSubnetAZ3Cidr"
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
          "IPSecTunnelTarget": {
            "Ref": "IPSecTunnelTarget"
          }
        }
      }
    }
```
