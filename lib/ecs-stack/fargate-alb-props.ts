import * as cdk from "@aws-cdk/core";

export interface FargateALBStudySyncStackProps extends cdk.StackProps {
  /**
   * stage the application is deployed on e.g. dev | prod
   */
  readonly stage: string;
  /**
   * AWS env: account and region
   */
  readonly env: { account: string; region: string };
}
