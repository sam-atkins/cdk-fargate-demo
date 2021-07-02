#!/usr/bin/env node

import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import { Conf } from "../utils/config";
import { FargateALBStudySyncStack } from "../lib/ecs-stack/fargate-alb";

const app = new cdk.App();
const stage = app.node.tryGetContext("stage");
const config = new Conf().get(stage);
const env = { account: config.awsAccount, region: config.awsRegion };

/**
 *
 * Stage specific Stacks
 *
 */
new FargateALBStudySyncStack(app, "StudySyncFargateALB", {
  stage,
  env,
});
