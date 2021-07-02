[![build](https://github.com/sam-atkins/cdk-fargate-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/sam-atkins/cdk-fargate-demo/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# AWS CDK Fargate Demo

AWS Fargate built using AWS-CDK.

- [AWS CDK Fargate Demo](#aws-cdk-fargate-demo)
  - [Useful commands](#useful-commands)
  - [Install](#install)
    - [Prerequisites](#prerequisites)
    - [Instructions](#instructions)

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile. Leave this running in one terminal whilst developing
 * `npm run test`    perform the jest unit tests
 * `cdk deploy <stackName> --profile <AWS profile name> -c stage=<stage>`      deploy this stack
 * `cdk destroy <stackName> --profile <AWS profile name> -c stage=<stage>`     destroy this stack
 * `cdk diff <stackName> --profile <AWS profile name> -c stage=<stage>`        compare deployed stack with current state
 * `cdk synth <stackName> --profile <AWS profile name> -c stage=<stage>`       emits the synthesized CloudFormation template
 * `cdk list --profile <AWS profile name> -c stage=<stage>`                    lists available Stacks

If you only have one AWS profile setup in `~/.aws/credentials` then you do not need to add `--profile <AWS profile name>` in the above `cdk` commands.

The Fargate stack requires stage configuration so commands require `-c stage=<stage>` e.g.

```bash
cdk list -c stage=dev
StudySyncFargateALB
```

## Install

### Prerequisites

- [Node and npm](https://nodejs.org/en/). Refer to `.nvmrc` for Node version
- Optional: [Node Version Manager](https://github.com/nvm-sh/nvm)
- [Typescript](https://www.typescriptlang.org)
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/cli.html)
- AWS User/Role with appropriate IAM permissions to run `cdk` commands

### Instructions

Update the configuration files in `./config`, in particular `config/default.yaml` add your AWS account ID and change the region if required.

Run these commands from the project root:

```bash
npm install

# one time command to bootstrap CDK environment
cdk bootstrap --profile <AWS profile name>
```
