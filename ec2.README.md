## ec2 nested stack

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
    "EC2Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "ec2.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "StackName": {
            "Ref": "AWS::StackName"
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
          "AmiId": {
            "Ref": "AmiId"
          },
          "SSHKeyName": {
            "Ref": "SSHKeyName"
          },
          "SubnetLocation": {
            "Ref": "SubnetLocation"
          },
          "ConsulToken": {
            "Ref": "ConsulToken"
          }
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

## Parameters

### ConsulToken

If specified, this is a special UUID used for implementing Consul ACL permissions on behalf of your EC2 instances.

When set, this token is automatically provisionned onto each EC2 instances and is used by default by all Consul requests
performed on the node, via the HTTP api (i.e. http://localhost:8500/) or the DNS lookups (i.e. dig lookup.service.consul).

Scripts and tools should not need to be made ACL Token aware in any way.
