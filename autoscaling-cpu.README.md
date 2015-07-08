## autoscaling-cpu nested stack

To use this stack you will need to set the required input parameter and include the stack as a resource.

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
    "AutoScalingStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubisproject-stacks", { "Ref": "StacksVersion" }, "autoscaling-cpu.template" ] ] },
        "TimeoutInMinutes": "60",
        "Parameters": {
          "AutoScalingGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.AutoScalingGroup"
            ]
          }
        }
      }
    }
```