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

### Stack description
This stack creates a set of NAT instances in an autoscaling group to be used from within a VPC.

#### Example resource defintion
```json
    "NATStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Condition": "CreatePrivateSubnets",
      "DependsOn": "PrivateSubnetStack",
      "Properties": {
        "TemplateURL": {
          "Fn::Join": [
            "/",
            [
              "https://s3.amazonaws.com/nubis-stacks",
              {
                "Ref": "StacksVersion"
              },
              "vpc/vpc-nat.template"
            ]
          ]
        },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "StackName": {
            "Fn::Join": [
              "-",
              [
                "nubis-nat",
                {
                  "Ref": "Environment"
                }
              ]
            ]
          },
          "ServiceName": {
            "Fn::Join": [
              "-",
              [
                "nubis-nat",
                {
                  "Ref": "Environment"
                }
              ]
            ]
          },
          "TechnicalOwner": {
            "Ref": "TechnicalOwner"
          },
          "StacksVersion": {
            "Ref": "StacksVersion"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "SSHKeyName": {
            "Ref": "SSHKeyName"
          },
          "NatSecurityGroup": {
            "Fn::GetAtt": [
              "PrivateSubnetStack",
              "Outputs.NatSecurityGroup"
            ]
          },
          "PrivateSubnetAZ1": {
            "Fn::GetAtt": [
              "PrivateSubnetStack",
              "Outputs.PrivateSubnetAZ1"
            ]
          },
          "PrivateSubnetAZ2": {
            "Fn::GetAtt": [
              "PrivateSubnetStack",
              "Outputs.PrivateSubnetAZ2"
            ]
          },
          "PrivateSubnetAZ3": {
            "Fn::GetAtt": [
              "PrivateSubnetStack",
              "Outputs.PrivateSubnetAZ3"
            ]
          }
        }
```

#### Stack outputs

 * `EipAz1` - EIP allocation ID for Elastic IP on AZ1
 * `EipAz2` - EIP allocation ID for Elastic IP on AZ2
 * `EipAz3` - EIP allocation ID for Elastic IP on AZ3
 * `EniAz1` - ENI ID for secondary interface
 * `EniAz2` - ENI ID for secondary interface
 * `EniAz3` - ENI ID for secondary interface
