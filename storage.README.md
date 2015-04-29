## Stprage (Ceph) nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "StorageStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/storage.template",
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
          "InstanceType": {
            "Ref": "StorageInstanceType"
          },
          "ClusterSize": {
            "Ref": "StorageClusterSize"
          },
          "VolumeSize": {
            "Ref": "StorageVolumeSize"
          },
          "EC2SecurityGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.GroupId"
            ]
          }
        }
      }
    }
```