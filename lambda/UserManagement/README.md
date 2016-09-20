# UserManagement

This is a lambda functions that includes 2 binaries from https://github.com/rtucker-mozilla/nubis-bastionsshkey and https://github.com/Versent/unicreds

### Local testing
To test locally you will need to install the following node package

```bash
# npm install -g lambda-local
```

You will need to provide it with an event file (a sample is included in this repo) and you can invoke the lambda function by running the following command

```bash
lambda-local -l index.js -h handler -e event.json
```
