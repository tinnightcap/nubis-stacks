## autoscaling-cpu nested stack

To use this stack you will need to set the required input parameter and include the stack as a resource.

#### Example resource definition
```json
    "EC2Stack": {
    "AutoScalingStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": "https://s3.amazonaws.com/nubisproject-stacks/master/autoscaling-cpu.template",
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