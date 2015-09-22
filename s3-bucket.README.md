## S3 Bucket nested stack

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
    "S3Stack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "s3-bucket.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "ServiceName": {
            "Ref": "ServiceName"
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

#### Notes
If you enable encryption on the bucket `"Encryption": "true"` you will need to upload files to your S3 bucket
using the `aws s3api` instead of the `aws s3` command.

```bash
aws s3api put-object --server-side-encryption AES256 --bucket <bucket name> --key <File name on S3> --body <Local path to file>
```
