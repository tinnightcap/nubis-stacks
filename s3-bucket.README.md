## S3 Bucket nested stack

To use this stack you will need to set the required input parameters and include the stack as a resource.

#### Example resource definition
```json
    "S3Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/s3-bucket.template",
        "TimeoutInMinutes": "60",
        "Parameters": {
          "ServiceName": {
            "Ref": "ServiceName"
          },
          "ProjectName": {
            "Ref": "ProjectName"
          },
          "Environment": {
            "Ref": "Environment"
          },
          "BucketName": {
            "Ref": "BucketName"
          },
          "TechnicalOwner": {
            "Ref": "TechnicalOwner"
          },
          "AccessControl": "PublicRead"
        }
      }
    }
```