## Commands to work with CloudFormation

NOTE: All examples run from the top level project directory.

You need to create a parameters.json file. You can use parameters.json-dist as an template.

To create a new stack:
```bash
aws cloudformation create-stack --stack-name nubis-stacks --template-body file://nubis/cloudformation/main.json --parameters file://nubis/cloudformation/parameters.json
```

To update and existing stack:
```bash
aws cloudformation update-stack --stack-name nubis-stacks --template-body file://nubis/cloudformation/main.json --parameters file://nubis/cloudformation/parameters.json
```

To delete the stack:
```bash
aws cloudformation delete-stack --stack-name nubis-stacks
```

After creating or updating a stack you might need to update Consul. Run this command to take any (properly described) Cloudformation outputs and insert or update them in Consul:
```bash
bash nubis/bin/consul_inputs.sh --settings nubis/cloudformation/parameters.json get-and-update
```

#### Nested Stacks

We are using nested stacks to deploy the necessary resources. You can find the nested stack templates at [nubis-stacks](https://github.com/Nubisproject/nubis-stacks).