# Change Log

## [v1.0.0](https://github.com/nubisproject/nubis-builder/tree/v1.0.0) (2015-09-01)

[Full Changelog](https://github.com/nubisproject/nubis-builder/compare/v1.0.1...v1.0.0)

**Merged pull requests:**

- Release v1.0.1 [\#92](https://github.com/Nubisproject/nubis-builder/pull/92) ([gozer](https://github.com/gozer))

## [v1.0.1](https://github.com/nubisproject/nubis-builder/tree/v1.0.1) (2015-08-31)

[Full Changelog](https://github.com/nubisproject/nubis-builder/compare/v1.0.0...v1.0.1)

**Implemented enhancements:**

- \[nubis-consul\] Support reaching Consul via https:// [\#90](https://github.com/Nubisproject/nubis-builder/issues/90)

**Merged pull requests:**

- Use https:// to talk to Consul [\#91](https://github.com/Nubisproject/nubis-builder/pull/91) ([gozer](https://github.com/gozer))

- start dev cycle [\#89](https://github.com/Nubisproject/nubis-builder/pull/89) ([gozer](https://github.com/gozer))

## [v1.0.0](https://github.com/nubisproject/nubis-builder/tree/v1.0.0) (2015-08-30)

[Full Changelog](https://github.com/nubisproject/nubis-builder/compare/v0.9.0...v1.0.0)

**Closed issues:**

- nubis-builder assumes base images are in our own account [\#82](https://github.com/Nubisproject/nubis-builder/issues/82)

- Amazon Linux applies security updates on boot. [\#77](https://github.com/Nubisproject/nubis-builder/issues/77)

- Tag v1.0.0 release [\#76](https://github.com/Nubisproject/nubis-builder/issues/76)

**Merged pull requests:**

- CHANGELOG for v1.0.0 [\#88](https://github.com/Nubisproject/nubis-builder/pull/88) ([gozer](https://github.com/gozer))

- Fix bug, incorrect handling of jq's null [\#87](https://github.com/Nubisproject/nubis-builder/pull/87) ([gozer](https://github.com/gozer))

- Added acl token support [\#86](https://github.com/Nubisproject/nubis-builder/pull/86) ([limed](https://github.com/limed))

- Add a new variable, nubis\_account\_id, to allow nubis-builder to search for public AMIs \(nubis-base\) to derive builds from. [\#83](https://github.com/Nubisproject/nubis-builder/pull/83) ([gozer](https://github.com/gozer))

- Disable security updates on boot, fixes issue \#77 [\#78](https://github.com/Nubisproject/nubis-builder/pull/78) ([gozer](https://github.com/gozer))

## [v0.9.0](https://github.com/nubisproject/nubis-builder/tree/v0.9.0) (2015-07-22)

[Full Changelog](https://github.com/nubisproject/nubis-builder/compare/1.1...v0.9.0)

**Fixed bugs:**

- Packer 0.8.1 seems to break nubis-builder [\#69](https://github.com/Nubisproject/nubis-builder/issues/69)

- Fix instance-store images [\#59](https://github.com/Nubisproject/nubis-builder/issues/59)

**Closed issues:**

- sudo errors causing packer builds to fail [\#71](https://github.com/Nubisproject/nubis-builder/issues/71)

- Move the creation of /etc/puppet/nubis/{files,templates} to the base image [\#63](https://github.com/Nubisproject/nubis-builder/issues/63)

- Intermittently, packer fails with Error launching source instance: The security group 'sg-xxxxxx' does not exist in VPC 'vpc-yyyyyy' [\#42](https://github.com/Nubisproject/nubis-builder/issues/42)

- Version bump sometimes picks an in-use version [\#41](https://github.com/Nubisproject/nubis-builder/issues/41)

- Builder errors out when running consul post-processor [\#39](https://github.com/Nubisproject/nubis-builder/issues/39)

- When ec2-bundle-volume is running under an IAM Role, it needs special care to work [\#28](https://github.com/Nubisproject/nubis-builder/issues/28)

**Merged pull requests:**

- Updating changelog for v0.9.0 release [\#73](https://github.com/Nubisproject/nubis-builder/pull/73) ([gozer](https://github.com/gozer))

- Fixes packer build issue after 0.8.1 upgrade [\#72](https://github.com/Nubisproject/nubis-builder/pull/72) ([limed](https://github.com/limed))

- Add volume\_size option, fixes \#69 [\#70](https://github.com/Nubisproject/nubis-builder/pull/70) ([gozer](https://github.com/gozer))

- Cosmetic fixes to nubis-consul output [\#67](https://github.com/Nubisproject/nubis-builder/pull/67) ([limed](https://github.com/limed))

- Make sure we copy the puppet files \*before\* we invoke puppet [\#65](https://github.com/Nubisproject/nubis-builder/pull/65) ([gozer](https://github.com/gozer))

- Move puppet files/templates directory creation to base image. Fixes \#63 [\#64](https://github.com/Nubisproject/nubis-builder/pull/64) ([gozer](https://github.com/gozer))

- Improve documentation for the aws\_region variable. [\#62](https://github.com/Nubisproject/nubis-builder/pull/62) ([gozer](https://github.com/gozer))

- jq for linux [\#61](https://github.com/Nubisproject/nubis-builder/pull/61) ([glogiotatidis](https://github.com/glogiotatidis))

- Fix instance-store images builds. Fixes \#59 [\#60](https://github.com/Nubisproject/nubis-builder/pull/60) ([gozer](https://github.com/gozer))

- verbose-- [\#57](https://github.com/Nubisproject/nubis-builder/pull/57) ([gozer](https://github.com/gozer))

- New Feature: if there is nubis/puppet/{files,templates} directory in the [\#56](https://github.com/Nubisproject/nubis-builder/pull/56) ([gozer](https://github.com/gozer))

- no need to copy Hiera stuff anymore [\#55](https://github.com/Nubisproject/nubis-builder/pull/55) ([gozer](https://github.com/gozer))

- Dont use Hiera anymore [\#54](https://github.com/Nubisproject/nubis-builder/pull/54) ([gozer](https://github.com/gozer))

- Taking out the last trailing comma in variables [\#53](https://github.com/Nubisproject/nubis-builder/pull/53) ([cshields](https://github.com/cshields))

- add homebrew instructions for OS X users [\#52](https://github.com/Nubisproject/nubis-builder/pull/52) ([floatingatoll](https://github.com/floatingatoll))

- changing 'Clone' to 'Fork' [\#51](https://github.com/Nubisproject/nubis-builder/pull/51) ([Sheeri](https://github.com/Sheeri))

- Updates for renaming nubis-blank to nubis-skel [\#50](https://github.com/Nubisproject/nubis-builder/pull/50) ([tinnightcap](https://github.com/tinnightcap))

- Documentation and multi stack updates [\#49](https://github.com/Nubisproject/nubis-builder/pull/49) ([tinnightcap](https://github.com/tinnightcap))

- Adding consul script as it is now being used by multiple projects [\#48](https://github.com/Nubisproject/nubis-builder/pull/48) ([tinnightcap](https://github.com/tinnightcap))

- Default to gp2 \(SSD\) drives for instances, but don't assume that when [\#46](https://github.com/Nubisproject/nubis-builder/pull/46) ([gozer](https://github.com/gozer))

- Add launch\_block\_device\_mappings as a work around to ensure packer created volumes get deleted once AMIs are built. [\#45](https://github.com/Nubisproject/nubis-builder/pull/45) ([gozer](https://github.com/gozer))

## [1.1](https://github.com/nubisproject/nubis-builder/tree/1.1) (2015-03-31)

[Full Changelog](https://github.com/nubisproject/nubis-builder/compare/1.0...1.1)

**Closed issues:**

- Tag releases [\#30](https://github.com/Nubisproject/nubis-builder/issues/30)

- Documentation [\#16](https://github.com/Nubisproject/nubis-builder/issues/16)

**Merged pull requests:**

- Code clean up and fixing instance-store builds  [\#43](https://github.com/Nubisproject/nubis-builder/pull/43) ([bhourigan](https://github.com/bhourigan))

- Adding documentation [\#40](https://github.com/Nubisproject/nubis-builder/pull/40) ([bhourigan](https://github.com/bhourigan))

- Missing coma [\#38](https://github.com/Nubisproject/nubis-builder/pull/38) ([tinnightcap](https://github.com/tinnightcap))

- Following the advice from https://www.packer.io/intro/getting-started/provision.html [\#37](https://github.com/Nubisproject/nubis-builder/pull/37) ([gozer](https://github.com/gozer))

## [1.0](https://github.com/nubisproject/nubis-builder/tree/1.0) (2015-03-24)

**Closed issues:**

- Pin Amazon Linux to 2014.09.2 and/or modify upstream AMI sourcing to exclude release candidates [\#34](https://github.com/Nubisproject/nubis-builder/issues/34)

- Cleanup log files before making the AMIs [\#32](https://github.com/Nubisproject/nubis-builder/issues/32)

- Intermittent build failure : Package ec2-ami-tools is not available [\#29](https://github.com/Nubisproject/nubis-builder/issues/29)

- Allow nubis-builder build to function without aws credentials \(using STS\) if the machine running nubis-build itself has access to an IAM role [\#24](https://github.com/Nubisproject/nubis-builder/issues/24)

- Create a /etc/nubis-$project-release file [\#23](https://github.com/Nubisproject/nubis-builder/issues/23)

- Make builder make AMIs public by default [\#22](https://github.com/Nubisproject/nubis-builder/issues/22)

- Add --dry-run [\#19](https://github.com/Nubisproject/nubis-builder/issues/19)

- nubis-builder always increments version when automatic\_version\_bump is set [\#13](https://github.com/Nubisproject/nubis-builder/issues/13)

- Re-enable instance-store builds [\#10](https://github.com/Nubisproject/nubis-builder/issues/10)

- Make project\_version automatically update if there is a version colision [\#9](https://github.com/Nubisproject/nubis-builder/issues/9)

- Make builder selection more robust [\#8](https://github.com/Nubisproject/nubis-builder/issues/8)

- aws cli tool should use same credentials as packer [\#7](https://github.com/Nubisproject/nubis-builder/issues/7)

- Add puppet provisioner that will be used for projects [\#6](https://github.com/Nubisproject/nubis-builder/issues/6)

- When using --verbose, pass this along to packer [\#5](https://github.com/Nubisproject/nubis-builder/issues/5)

- Add flag to preserve json file in the event of an error [\#4](https://github.com/Nubisproject/nubis-builder/issues/4)

- Not all projects need to build for 4 platforms [\#2](https://github.com/Nubisproject/nubis-builder/issues/2)

- Add MPL2 license. [\#1](https://github.com/Nubisproject/nubis-builder/issues/1)

**Merged pull requests:**

- Baking in version [\#36](https://github.com/Nubisproject/nubis-builder/pull/36) ([bhourigan](https://github.com/bhourigan))

- Excluding AMIs who has a .Name which contains '.rc-', jq supports regex ... [\#35](https://github.com/Nubisproject/nubis-builder/pull/35) ([bhourigan](https://github.com/bhourigan))

- AWS IAM bugfix and addressing Issue 32 [\#33](https://github.com/Nubisproject/nubis-builder/pull/33) ([bhourigan](https://github.com/bhourigan))

- Adding --version [\#31](https://github.com/Nubisproject/nubis-builder/pull/31) ([bhourigan](https://github.com/bhourigan))

- Conditional bundle\_upload\_command appending [\#27](https://github.com/Nubisproject/nubis-builder/pull/27) ([bhourigan](https://github.com/bhourigan))

- Forgot that these inline scripts run as an unprivileged user [\#26](https://github.com/Nubisproject/nubis-builder/pull/26) ([bhourigan](https://github.com/bhourigan))

- Addressing https://github.com/Nubisproject/nubis-builder/issues/24 [\#25](https://github.com/Nubisproject/nubis-builder/pull/25) ([bhourigan](https://github.com/bhourigan))

- Adding create option [\#21](https://github.com/Nubisproject/nubis-builder/pull/21) ([bhourigan](https://github.com/bhourigan))

- Module improvements [\#20](https://github.com/Nubisproject/nubis-builder/pull/20) ([bhourigan](https://github.com/bhourigan))

- disable eu-west-1 for now, it just slows things down [\#18](https://github.com/Nubisproject/nubis-builder/pull/18) ([gozer](https://github.com/gozer))

- A few small fixes & restoring instance-store builders [\#17](https://github.com/Nubisproject/nubis-builder/pull/17) ([bhourigan](https://github.com/bhourigan))

- Refactoring AMI generation & adding builder verbosity [\#15](https://github.com/Nubisproject/nubis-builder/pull/15) ([bhourigan](https://github.com/bhourigan))

- Adding --sort-keys to jq when bumping version [\#14](https://github.com/Nubisproject/nubis-builder/pull/14) ([bhourigan](https://github.com/bhourigan))

- Automatic project\_path discovery [\#12](https://github.com/Nubisproject/nubis-builder/pull/12) ([bhourigan](https://github.com/bhourigan))

- Instead of requiring a --builder-prefix, why not just find ourselves? [\#11](https://github.com/Nubisproject/nubis-builder/pull/11) ([gozer](https://github.com/gozer))

- Fix script errors [\#3](https://github.com/Nubisproject/nubis-builder/pull/3) ([tinnightcap](https://github.com/tinnightcap))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*