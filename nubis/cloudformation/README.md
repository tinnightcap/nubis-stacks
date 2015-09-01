## Commands to work with CloudFormation
NOTE: All examples run from the top level project directory.

### Set up
Start by setting the profile and region, NOTE: If you have not set up any profiles set this to '*default*'. These commands assume that you have set up your profile names the same as the account names:
```bash
STACK_NAME='nubis-lambda-roll'; PROFILE='nubis-lab'; REGION='us-west-2'
```

### Create
To create a new stack:
```bash
aws cloudformation create-stack --template-body file://nubis/cloudformation/main.json --parameters file://nubis/cloudformation/parameters.json --profile $PROFILE --region $REGION --stack-name $STACK_NAME
```

### Update
To update and existing stack:
```bash
aws cloudformation update-stack --template-body file://nubis/cloudformation/main.json --parameters file://nubis/cloudformation/parameters.json --profile $PROFILE --region $REGION --stack-name $STACK_NAME
```

### Delete
To delete the stack:
```bash
aws cloudformation delete-stack --region $REGION --stack-name $STACK_NAME
```

### Progress
To monitor the state of the stack action:
```bash
watch -n 1 "echo 'Container Stack'; aws cloudformation describe-stacks --region $REGION --profile $PROFILE --query 'Stacks[*].[StackName, StackStatus]' --output text --stack-name STACK_NAME; echo \"\nStack Resources\"; aws cloudformation describe-stack-resources --region $REGION --profile $PROFILE --stack-name STACK_NAME --query 'StackResources[*].[LogicalResourceId, ResourceStatus]' --output text"
```

#### Nested Stacks
We are using nested stacks to deploy the necessary resources. You can find the nested stack templates at [nubis-stacks](https://github.com/Nubisproject/nubis-stacks).
