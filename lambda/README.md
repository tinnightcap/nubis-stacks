## Lambda Functions
This directory contains the [Lambda](https://aws.amazon.com/lambda/) applications that we deploy and use with our nested stacks.

#### Local development
To local development on your lambda function you need to install a few things. The examples here will assume we are workign on the LookupStackOutputs function.

* Make sure you have `npm` installed, mac users can install it using [homebrew](http://brew.sh/) and there is a nice doc for linux users [here](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)

* Install `node-lambda` globally (optional as it is required in each function)

    Mac
    ```bash
    $ npm install -g node-lambda
    ```
    Linux
    ```bash
    $ sudo npm install -g node-lambda
    ```

* Create a folder for your lambda function or use the current directory that you are in to develop your script

* Create a `package.json` file (note: Dependency '*' means that it will install the latest version)

    ```json
    {
        "name": "LookupStackOutputs",
        "version": "0.0.1",
        "description": "Looks up stack outputs",
        "main": "index.js",
        "author": "nubis",
        "private": "true",
        "license": "MPL",
        "dependencies": {
            "node-lambda": "0.1.5",
            "aws-sdk": "*"
        }
    }
    ```

* Run `npm install` in the current directory to install the package dependency

* Run `node-lambda setup` in the current directory to setup the project, it will generate 3 files:
    * `event.json`
    * `deploy.env`
    * `.env`

    The files we really care about are `event.json` and `.env`. There is an example dist file included for each of these:
    * `event.json` - where you mock your event
    * `.env` - where you place your deployment configuration

* If node fails to run on linux with the error:
    > '/usr/bin/env: node: No such file or directory'

    * You can fix this error by doing the following

        ```bash
        ln -s /usr/bin/nodejs /usr/bin/node
        ```

* At this point its probably a good idea to create a gitignore to ignore some of the files (NOTE: These are globally ignored in this repository):

    ```bash
    $ echo -e ".env\ndeploy.env\nevent.json" >> .gitignore
    $ echo "node_modules" >> .gitignore
    ```

* Edit `event.json` to fit your need

* Now you are ready to test your code, you can test your code by running the `node-lambda run` command

### References
* http://radify.io/blog/aws-lambda-workflow/

* https://github.com/joyent/node/wiki/installing-node.js-via-package-manager

* https://github.com/RebelMail/node-lambda

* https://www.npmjs.com/package/node-lambda
