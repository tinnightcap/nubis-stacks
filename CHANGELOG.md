# Change Log

## [v0.9.0](https://github.com/nubisproject/nubis-stacks/tree/v0.9.0) (2015-07-22)

**Implemented enhancements:**

- \[EC2\] No ability to launch instances in the Public Subnets [\#53](https://github.com/Nubisproject/nubis-stacks/issues/53)

- ELB support for port 443 [\#42](https://github.com/Nubisproject/nubis-stacks/issues/42)

- Versionning from within projects CF templates [\#41](https://github.com/Nubisproject/nubis-stacks/issues/41)

- Determine versionned release mechanics [\#40](https://github.com/Nubisproject/nubis-stacks/issues/40)

- Complete validation for all input parameters [\#37](https://github.com/Nubisproject/nubis-stacks/issues/37)

**Closed issues:**

- CloudFormation doesn't support comments [\#4](https://github.com/Nubisproject/nubis-stacks/issues/4)

**Merged pull requests:**

- Update the storage stack to use nubis-stacks 0.9.0 [\#68](https://github.com/Nubisproject/nubis-stacks/pull/68) ([tinnightcap](https://github.com/tinnightcap))

- Removing ProjectName parameter from README files [\#67](https://github.com/Nubisproject/nubis-stacks/pull/67) ([limed](https://github.com/limed))

- Return AutoScalingGroupPrivate -\> AutoScalingGroup [\#66](https://github.com/Nubisproject/nubis-stacks/pull/66) ([limed](https://github.com/limed))

- Public private subnet option [\#64](https://github.com/Nubisproject/nubis-stacks/pull/64) ([limed](https://github.com/limed))

- Add Name tag for autoscaling group [\#57](https://github.com/Nubisproject/nubis-stacks/pull/57) ([limed](https://github.com/limed))

- update stack examples with StacksVersion [\#52](https://github.com/Nubisproject/nubis-stacks/pull/52) ([gozer](https://github.com/gozer))

- Add input validation to all stacks, fixes issue \#37 [\#51](https://github.com/Nubisproject/nubis-stacks/pull/51) ([gozer](https://github.com/gozer))

- Add a new SSLCertificate argument to the ELB Stack, if specified, its the ARN of the SSL certificate to use, otherwise, defaults to a shared cert. [\#49](https://github.com/Nubisproject/nubis-stacks/pull/49) ([gozer](https://github.com/gozer))

- Fixing keyname as needed by EC2 [\#48](https://github.com/Nubisproject/nubis-stacks/pull/48) ([tinnightcap](https://github.com/tinnightcap))

- Rename KeyName to SSHKeyName, for nubisproject/nubis-docs\#35 [\#47](https://github.com/Nubisproject/nubis-stacks/pull/47) ([gozer](https://github.com/gozer))

- update AMIs to v0.51 [\#46](https://github.com/Nubisproject/nubis-stacks/pull/46) ([gozer](https://github.com/gozer))

- Update Storage Stack to v0.50 \(S3 Backups\) [\#45](https://github.com/Nubisproject/nubis-stacks/pull/45) ([gozer](https://github.com/gozer))

- Add a new option to enable/disable bucket versionning: VersioningConfiguration [\#44](https://github.com/Nubisproject/nubis-stacks/pull/44) ([gozer](https://github.com/gozer))

- Added a readme file for upload\_to\_s3 variable script [\#36](https://github.com/Nubisproject/nubis-stacks/pull/36) ([limed](https://github.com/limed))

- Fixed typo [\#35](https://github.com/Nubisproject/nubis-stacks/pull/35) ([limed](https://github.com/limed))

- Added rds-postgres.template readme file [\#34](https://github.com/Nubisproject/nubis-stacks/pull/34) ([limed](https://github.com/limed))

- reindent and fix little tyop [\#33](https://github.com/Nubisproject/nubis-stacks/pull/33) ([gozer](https://github.com/gozer))

- Template to support postgres in RDS [\#31](https://github.com/Nubisproject/nubis-stacks/pull/31) ([limed](https://github.com/limed))

- Add optionnal IamInstanceProfile option [\#30](https://github.com/Nubisproject/nubis-stacks/pull/30) ([gozer](https://github.com/gozer))

- Updating variables-dist file [\#29](https://github.com/Nubisproject/nubis-stacks/pull/29) ([tinnightcap](https://github.com/tinnightcap))

- o\# Please enter the commit message for your changes. Lines starting [\#28](https://github.com/Nubisproject/nubis-stacks/pull/28) ([tinnightcap](https://github.com/tinnightcap))

- Set default cluster size to 3 again [\#27](https://github.com/Nubisproject/nubis-stacks/pull/27) ([gozer](https://github.com/gozer))

- release nubis-storage 0.41 [\#26](https://github.com/Nubisproject/nubis-stacks/pull/26) ([gozer](https://github.com/gozer))

- Adding snapshot on delete [\#25](https://github.com/Nubisproject/nubis-stacks/pull/25) ([tinnightcap](https://github.com/tinnightcap))

- Update dev to stage [\#24](https://github.com/Nubisproject/nubis-stacks/pull/24) ([tinnightcap](https://github.com/tinnightcap))

- Upgrade Storage [\#23](https://github.com/Nubisproject/nubis-stacks/pull/23) ([gozer](https://github.com/gozer))

- Adding StackName to ec2 UserData [\#22](https://github.com/Nubisproject/nubis-stacks/pull/22) ([tinnightcap](https://github.com/tinnightcap))

- Rename route53 stack parameter & set default healthcheck for elb stack [\#21](https://github.com/Nubisproject/nubis-stacks/pull/21) ([tinnightcap](https://github.com/tinnightcap))

- Parameterizing autoscaling trigger points [\#20](https://github.com/Nubisproject/nubis-stacks/pull/20) ([tinnightcap](https://github.com/tinnightcap))

- Adding support for an autoscaling policy stack [\#19](https://github.com/Nubisproject/nubis-stacks/pull/19) ([tinnightcap](https://github.com/tinnightcap))

- Set more reasonable defaults [\#18](https://github.com/Nubisproject/nubis-stacks/pull/18) ([tinnightcap](https://github.com/tinnightcap))

- Expose health check target [\#17](https://github.com/Nubisproject/nubis-stacks/pull/17) ([tinnightcap](https://github.com/tinnightcap))

- release storage 0.32 [\#16](https://github.com/Nubisproject/nubis-stacks/pull/16) ([gozer](https://github.com/gozer))

- Fix security group to limit ports [\#15](https://github.com/Nubisproject/nubis-stacks/pull/15) ([tinnightcap](https://github.com/tinnightcap))

- Add https support and remove conditional logic [\#14](https://github.com/Nubisproject/nubis-stacks/pull/14) ([tinnightcap](https://github.com/tinnightcap))

- Release nubis-storage 0.31 [\#13](https://github.com/Nubisproject/nubis-stacks/pull/13) ([gozer](https://github.com/gozer))

- Change ProjectName to ServiceName [\#12](https://github.com/Nubisproject/nubis-stacks/pull/12) ([tinnightcap](https://github.com/tinnightcap))

- Adjust rds template to use custom parameter group [\#11](https://github.com/Nubisproject/nubis-stacks/pull/11) ([tinnightcap](https://github.com/tinnightcap))

- add initial dump of storage stack [\#10](https://github.com/Nubisproject/nubis-stacks/pull/10) ([gozer](https://github.com/gozer))

- Reworking remaining templates to use Lambda function [\#9](https://github.com/Nubisproject/nubis-stacks/pull/9) ([tinnightcap](https://github.com/tinnightcap))

- Converting ec2 & elb templates to parameter lookup [\#8](https://github.com/Nubisproject/nubis-stacks/pull/8) ([tinnightcap](https://github.com/tinnightcap))

- Consul bootstraping, Lambda function and minor fixes [\#7](https://github.com/Nubisproject/nubis-stacks/pull/7) ([tinnightcap](https://github.com/tinnightcap))

- Rename and rework rds template [\#6](https://github.com/Nubisproject/nubis-stacks/pull/6) ([tinnightcap](https://github.com/tinnightcap))

- Deploy with cloudformation [\#3](https://github.com/Nubisproject/nubis-stacks/pull/3) ([tinnightcap](https://github.com/tinnightcap))

- Add push script and moved mappings [\#2](https://github.com/Nubisproject/nubis-stacks/pull/2) ([tinnightcap](https://github.com/tinnightcap))

- Substacks and Readmes [\#1](https://github.com/Nubisproject/nubis-stacks/pull/1) ([tinnightcap](https://github.com/tinnightcap))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*