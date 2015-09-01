## VPC VPN Nested Stack

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
    "VPNStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "vpc/vpc-vpn.template" ] ] },
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
          "PublicRouteTable": {
            "Ref": "PublicRouteTable"
          },
          "PrivateRouteTableAZ1": {
            "Ref": "PrivateRouteTableAZ1"
          },
          "PrivateRouteTableAZ2": {
            "Ref": "PrivateRouteTableAZ2"
          },
          "PrivateRouteTableAZ3": {
            "Ref": "PrivateRouteTableAZ3"
          },
          "IPSecTunnelTarget": {
            "Ref": "IPSecTunnelTarget"
          }
        }
      }
    }
```
