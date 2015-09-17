## RDS nested stack

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
    "RDSStack": {
      "Type": "AWS::CloudFormation::Stack",
      "Properties": {
        "TemplateURL": { "Fn::Join": [ "/", [ "https://s3.amazonaws.com/nubis-stacks", { "Ref": "StacksVersion" }, "rds-postgres.template" ] ] },
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
          "AllocatedStorage": "15",
          "DBInstanceClass": "db.t1.micro",
          "DBName": "MyDb",
          "EC2SecurityGroup": {
            "Fn::GetAtt": [
              "EC2Stack",
              "Outputs.EC2SecurityGroup"
            ]
          }
        }
      }
    }
    }
```

### Root Password

The MasterUserPassword is set at stack creation time to a default password of 'provisioner_password'. This password MUST be changed the first time the database is accessed. The intent is to reset the password and update Consul with the new password. Any additional resources requiring access to the database will retrieve it from Consul. If necessary the Consul key/value can be protected with ACLs.

#### migrate.sh code
The following code snippet shows how to detect the default password, reset it, and update Consul with the new value. Place this code in the nubis/bin/migrate.sh file:
``` bash
# Set up the logger command if the binary is installed
LOGGER_BIN='/usr/bin/logger'
if [ ! -x $LOGGER_BIN ]; then
    echo "ERROR: 'logger' binary not found - Aborting"
    echo "ERROR: '$BASH_SOURCE' Line: '$LINENO'"
    exit 2
else
    LOGGER="$LOGGER_BIN --stderr --priority local7.info --tag migrate.sh"
fi

# Source the consul connection details from the metadata api
eval $(curl -fq http://169.254.169.254/latest/user-data)

# Check to see if NUBIS_MIGRATE was set in userdata. If not we exit quietly.
if [ ${NUBIS_MIGRATE:-0} == '0' ]; then
    exit 0
fi

# Set up the consul url
# We get both NUBIS_STACK and NUBIS_ENVIRONMENT from user data (metadata api)
CONSUL="http://localhost:8500/v1/kv/$NUBIS_STACK/$NUBIS_ENVIRONMENT/config"

# We run early, so we need to account for Consul's startup time
CONSUL_UP=-1
COUNT=0
while [ "$CONSUL_UP" != "0" ]; do
    if [ ${COUNT} == "6" ]; then
        $LOGGER "ERROR: Timeout while attempting to connect to consul."
        exit 1
    fi
    QUERY=$(curl -s ${CONSUL}?raw=1)
    CONSUL_UP=$?

    if [ "$QUERY" != "" ]; then
        CONSUL_UP=-2
    fi

    if [ "$CONSUL_UP" != "0" ]; then
      $LOGGER "Consul not ready yet ($CONSUL_UP). Sleeping 10 seconds before retrying..."
      sleep 10
      COUNT=${COUNT}+1
    fi
done

# Test for database password in consul
# If unset generate and set in consul
DB_PASSWORD=$(curl -s $CONSUL/DB_PASSWORD?raw=1)
if [ "$DB_PASSWORD" == "" ]; then
    DB_PASSWORD=$(makepasswd --minchars=12 --maxchars=16)
    curl -s -X PUT -d $DB_PASSWORD $CONSUL/DB_PASSWORD
fi

# Grab the variables from consul
#+ If this is a new stack we need to wait for the values to be placed in consul
#+ We will test the first value we need and sleep with a timeout
KEYS_UP=-1
COUNT=0
while [ "$KEYS_UP" != "0" ]; do
    # Try for 20 minutes (30 seconds * 40 attempts = 1200 seconds / 60 seconds = 20 minutes)
    if [ ${COUNT} == "40" ]; then
        $LOGGER "ERROR: Timeout while waiting for keys to be populated in consul."
        exit 1
    fi
    QUERY=$(curl -s $CONSUL/DB_SERVER?raw=1)

    if [ "$QUERY" == "" ]; then
        $LOGGER "Keys not ready yet. Sleeping 30 seconds before retrying..."
        sleep 30
        COUNT=${COUNT}+1
    else
        KEYS_UP=0
    fi
done

# Now we can safely gather the values
DB_SERVER=$(curl -s $CONSUL/DB_SERVER?raw=1)
DB_NAME=$(curl -s $CONSUL/DB_NAME?raw=1)
DB_USER=$(curl -s $CONSUL/DB_USER?raw=1)

# Reset the database password on first run
# Create mysql defaults file
echo -e "[client]\npassword=$DB_PASSWORD\nhost=$DB_SERVER\nuser=$DB_USER" > .DB_DEFAULTS
# Test the current password, if it works we do nothing more here
TEST_PASS=$(mysql --defaults-file=.DB_DEFAULTS DB_NAME -e "show tables" 2>&1)
if [ $(echo $TEST_PASS | grep -c 'ERROR 1045') == 1 ]; then
    # Use the provisioner pasword to cange the password
    echo -e "[client]\npassword=provisioner_password\nhost=$DB_SERVER\nuser=$DB_USER" > .DB_DEFAULTS
    $LOGGER "Detected provisioner passwrod, reseting database password."
    mysql --defaults-file=.DB_DEFAULTS $DB_NAME -e "SET PASSWORD FOR '$DB_USER'@'%' = password('$DB_PASSWORD')"
    RV=$?
    if [ $RV != 0 ]; then
        $LOGGER "ERROR: Could not access mysql database ($RV), aborting."
        exit $RV
    fi
    # Rewrite defaults file with updated password
    echo -e "[client]\npassword=$DB_PASSWORD\nhost=$DB_SERVER\nuser=$DB_USER" > .DB_DEFAULTS
fi

### DO WORK HERE ###
# Like initializing database tables

# After the work is done be sure to clean up
rm -f .DB_DEFAULTS
```

#### Installing and running migrate.sh
The migrate.sh script should be installed on the EC2 instances using a packer provisioner. It will then be automatically run on boot if the migrate parameter is set to '1' (the default) in the EC2 nested stack.

Use this provisioner in nubis/builder/provisionesrs.json to install the migrate.sh script
```json
{
  "type": "file",
  "source": "nubis/bin/migrate.sh",
  "destination": "/tmp/migrate.sh",
  "order": "13"
},
{
  "type": "shell",
  "inline": [
      "sudo mv /tmp/migrate.sh /etc/nubis.d/migrate",
      "sudo chown root:root /etc/nubis.d/migrate",
      "sudo chmod 755 /etc/nubis.d/migrate"
  ],
  "order": "14"
  }
```

#### Nuts and Bolts
It is not generally necessary to read this section. This information is here for troubleshooting or for those interested in the gritty details.

 * RDS MasterUserPassword is provisioned with CloudFormation using a default static password
   * https://github.com/Nubisproject/nubis-stacks/blob/db07ec0a08a0cb3c3fa9c574efe3bbfb40d44c23/rds-mysql.template#L174
   * https://github.com/Nubisproject/nubis-stacks/blob/db07ec0a08a0cb3c3fa9c574efe3bbfb40d44c23/rds-postgres.template#L134
 * Packer runs packer-bootstrap at base AMI built time
   * https://github.com/Nubisproject/nubis-base/blob/40d92eef2d25508c89cb2557058ca07d99f96ad8/nubis/builder/packer-bootstrap.json
 * packer-bootstrap installes autojoin.sh which was placed on the base AMI in /tmp by packer
   * https://github.com/Nubisproject/nubis-base/blob/40d92eef2d25508c89cb2557058ca07d99f96ad8/nubis/builder/consul-autojoin.json
   * https://github.com/Nubisproject/nubis-base/blob/40d92eef2d25508c89cb2557058ca07d99f96ad8/nubis/bin/packer-bootstrap#L119-L124
 * When the instance starts it runs consul-autojoin.sh which has been installed as rc.local
 * consul-autojoin.sh calls /etc/nubis.d/* which includes migrate.sh
   * https://github.com/Nubisproject/nubis-base/blob/40d92eef2d25508c89cb2557058ca07d99f96ad8/nubis/bin/consul-autojoin.sh#L163-L165
 * migrate.sh was placed in /etc/nubis.d/ by Packer at project AMI build time (See snippet above)
 * migrate.sh does the following on boot of an applicable project EC2 instance (See snippet above)
   * Fetch the RDS password from consul
     * If there is no password it generates a password and writes it to consul
   * Attempt to connect to RDS with the generated password
   * If it fails, it attempts a second time to connect to RDS, now with the default static password
     * If it succeeds it sets the password to the generated password
