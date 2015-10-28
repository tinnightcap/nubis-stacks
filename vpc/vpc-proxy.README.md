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
This stack creates a set of proxy instances in an autoscaling group to be used from within a VPC.

#### Example resource definition
```json
    "ProxyStack": {
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
              "vpc/vpc-proxy.template"
            ]
          ]
        },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "StackName": {
            "Fn::Join": [
              "-",
              [
                "nubis-proxy",
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
                "nubis-proxy",
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
          "VpcId": {
            "Ref": "NubisVpc"
          },
          "SshSecurityGroupId": {
            "Ref": "SshSecurityGroup"
          },
          "InternetAccessSecurityGroupId": {
            "Ref": "InternetAccessSecurityGroup"
          },
          "SharedServicesSecurityGroupId": {
            "Ref": "SharedServicesSecurityGroup"
          },
          "NubisDomain": {
            "Ref": "NubisDomain"
          },
          "VPCServiceName": {
            "Ref": "ServiceName"
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
      }
    }```
