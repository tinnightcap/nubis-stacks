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

