import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";

import { Conf } from "../../utils/config";
import { FargateALBStudySyncStackProps } from "./fargate-alb-props";

/**
 * FargateALBStudySyncStack
 * Deploy StudySync app (from ExamPro course) to a
 * Fargate stack with public Application Load Balancer
 */
export class FargateALBStudySyncStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: FargateALBStudySyncStackProps
  ) {
    super(scope, id, props);

    const config = new Conf().get(props.stage);

    const vpc = new ec2.Vpc(this, "MyVpc", {});

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc,
    });

    const fargateTaskDef = new ecs.FargateTaskDefinition(this, "TaskDef", {
      memoryLimitMiB: Number(config.studySyncApp.fargateTaskMemoryLimitMib),
      cpu: Number(config.studySyncApp.fargateTaskCPU),
    });

    const studySyncImageRepo = ecr.Repository.fromRepositoryArn(
      this,
      "ecr-study-sync",
      "arn:aws:ecr:eu-west-2:560411514111:repository/study-sync"
    );

    fargateTaskDef.addContainer("StudySyncContainer", {
      image: ecs.ContainerImage.fromEcrRepository(
        studySyncImageRepo,
        config.studySyncApp.imageTag
      ),
      environment: {
        PORT: config.studySyncApp.env.CONTAINER_PORT,
        NODE_ENV: config.studySyncApp.env.NODE_ENV,
      },
      portMappings: [
        {
          containerPort: Number(config.studySyncApp.env.CONTAINER_PORT),
        },
      ],
    });

    // Create a load-balanced Fargate service and make it public
    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateALBService",
      {
        cluster: cluster,
        cpu: config.studySyncApp.ALBFargateServiceCPU, // Default: 256
        desiredCount: config.studySyncApp.ALBFargateServiceServiceCount, // Default: 1
        taskDefinition: fargateTaskDef,
        memoryLimitMiB: config.studySyncApp.ALBFargateServiceMemoryLimitMib, // Default: 512
        publicLoadBalancer: true,
      }
    );
  }
}
