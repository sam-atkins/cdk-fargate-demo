import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";

import * as fargate from "../../lib/ecs-stack/fargate-alb";
import { Conf } from "../../utils/config";

test("Test FargateALBStudySyncStack", () => {
  const app = new cdk.App();
  const stage = "prod";
  const config = new Conf().get(stage);
  const env = { account: config.awsAccount, region: config.awsRegion };

  // WHEN
  const stack = new fargate.FargateALBStudySyncStack(
    app,
    "TestFargateALBStack",
    {
      stage,
      env,
    }
  );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          MyVpcF9F0CA6F: {
            Type: "AWS::EC2::VPC",
            Properties: {
              CidrBlock: "10.0.0.0/16",
              EnableDnsHostnames: true,
              EnableDnsSupport: true,
              InstanceTenancy: "default",
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc",
                },
              ],
            },
          },
          MyVpcPublicSubnet1SubnetF6608456: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.0.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1a",
              MapPublicIpOnLaunch: true,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Public",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Public",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet1",
                },
              ],
            },
          },
          MyVpcPublicSubnet1RouteTableC46AB2F4: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet1",
                },
              ],
            },
          },
          MyVpcPublicSubnet1RouteTableAssociation2ECEE1CB: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet1RouteTableC46AB2F4",
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet1SubnetF6608456",
              },
            },
          },
          MyVpcPublicSubnet1DefaultRoute95FDF9EB: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet1RouteTableC46AB2F4",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              GatewayId: {
                Ref: "MyVpcIGW5C4A4F63",
              },
            },
            DependsOn: ["MyVpcVPCGW488ACE0D"],
          },
          MyVpcPublicSubnet1EIP096967CB: {
            Type: "AWS::EC2::EIP",
            Properties: {
              Domain: "vpc",
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet1",
                },
              ],
            },
          },
          MyVpcPublicSubnet1NATGatewayAD3400C1: {
            Type: "AWS::EC2::NatGateway",
            Properties: {
              AllocationId: {
                "Fn::GetAtt": ["MyVpcPublicSubnet1EIP096967CB", "AllocationId"],
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet1SubnetF6608456",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet1",
                },
              ],
            },
          },
          MyVpcPublicSubnet2Subnet492B6BFB: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.32.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1b",
              MapPublicIpOnLaunch: true,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Public",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Public",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet2",
                },
              ],
            },
          },
          MyVpcPublicSubnet2RouteTable1DF17386: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet2",
                },
              ],
            },
          },
          MyVpcPublicSubnet2RouteTableAssociation227DE78D: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet2RouteTable1DF17386",
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet2Subnet492B6BFB",
              },
            },
          },
          MyVpcPublicSubnet2DefaultRoute052936F6: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet2RouteTable1DF17386",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              GatewayId: {
                Ref: "MyVpcIGW5C4A4F63",
              },
            },
            DependsOn: ["MyVpcVPCGW488ACE0D"],
          },
          MyVpcPublicSubnet2EIP8CCBA239: {
            Type: "AWS::EC2::EIP",
            Properties: {
              Domain: "vpc",
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet2",
                },
              ],
            },
          },
          MyVpcPublicSubnet2NATGateway91BFBEC9: {
            Type: "AWS::EC2::NatGateway",
            Properties: {
              AllocationId: {
                "Fn::GetAtt": ["MyVpcPublicSubnet2EIP8CCBA239", "AllocationId"],
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet2Subnet492B6BFB",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet2",
                },
              ],
            },
          },
          MyVpcPublicSubnet3Subnet57EEE236: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.64.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1c",
              MapPublicIpOnLaunch: true,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Public",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Public",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet3",
                },
              ],
            },
          },
          MyVpcPublicSubnet3RouteTable15028F08: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet3",
                },
              ],
            },
          },
          MyVpcPublicSubnet3RouteTableAssociation5C27DDA4: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet3RouteTable15028F08",
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet3Subnet57EEE236",
              },
            },
          },
          MyVpcPublicSubnet3DefaultRoute3A83AB36: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPublicSubnet3RouteTable15028F08",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              GatewayId: {
                Ref: "MyVpcIGW5C4A4F63",
              },
            },
            DependsOn: ["MyVpcVPCGW488ACE0D"],
          },
          MyVpcPublicSubnet3EIPC5ACADAB: {
            Type: "AWS::EC2::EIP",
            Properties: {
              Domain: "vpc",
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet3",
                },
              ],
            },
          },
          MyVpcPublicSubnet3NATGatewayD4B50EBE: {
            Type: "AWS::EC2::NatGateway",
            Properties: {
              AllocationId: {
                "Fn::GetAtt": ["MyVpcPublicSubnet3EIPC5ACADAB", "AllocationId"],
              },
              SubnetId: {
                Ref: "MyVpcPublicSubnet3Subnet57EEE236",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PublicSubnet3",
                },
              ],
            },
          },
          MyVpcPrivateSubnet1Subnet5057CF7E: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.96.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1a",
              MapPublicIpOnLaunch: false,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Private",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Private",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet1",
                },
              ],
            },
          },
          MyVpcPrivateSubnet1RouteTable8819E6E2: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet1",
                },
              ],
            },
          },
          MyVpcPrivateSubnet1RouteTableAssociation56D38C7E: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet1RouteTable8819E6E2",
              },
              SubnetId: {
                Ref: "MyVpcPrivateSubnet1Subnet5057CF7E",
              },
            },
          },
          MyVpcPrivateSubnet1DefaultRouteA8CDE2FA: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet1RouteTable8819E6E2",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              NatGatewayId: {
                Ref: "MyVpcPublicSubnet1NATGatewayAD3400C1",
              },
            },
          },
          MyVpcPrivateSubnet2Subnet0040C983: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.128.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1b",
              MapPublicIpOnLaunch: false,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Private",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Private",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet2",
                },
              ],
            },
          },
          MyVpcPrivateSubnet2RouteTableCEDCEECE: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet2",
                },
              ],
            },
          },
          MyVpcPrivateSubnet2RouteTableAssociation86A610DA: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet2RouteTableCEDCEECE",
              },
              SubnetId: {
                Ref: "MyVpcPrivateSubnet2Subnet0040C983",
              },
            },
          },
          MyVpcPrivateSubnet2DefaultRoute9CE96294: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet2RouteTableCEDCEECE",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              NatGatewayId: {
                Ref: "MyVpcPublicSubnet2NATGateway91BFBEC9",
              },
            },
          },
          MyVpcPrivateSubnet3Subnet772D6AD7: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.160.0/19",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              AvailabilityZone: "dummy1c",
              MapPublicIpOnLaunch: false,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Private",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Private",
                },
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet3",
                },
              ],
            },
          },
          MyVpcPrivateSubnet3RouteTableB790927C: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc/PrivateSubnet3",
                },
              ],
            },
          },
          MyVpcPrivateSubnet3RouteTableAssociationD951741C: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet3RouteTableB790927C",
              },
              SubnetId: {
                Ref: "MyVpcPrivateSubnet3Subnet772D6AD7",
              },
            },
          },
          MyVpcPrivateSubnet3DefaultRouteEC11C0C5: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "MyVpcPrivateSubnet3RouteTableB790927C",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              NatGatewayId: {
                Ref: "MyVpcPublicSubnet3NATGatewayD4B50EBE",
              },
            },
          },
          MyVpcIGW5C4A4F63: {
            Type: "AWS::EC2::InternetGateway",
            Properties: {
              Tags: [
                {
                  Key: "Name",
                  Value: "TestFargateALBStack/MyVpc",
                },
              ],
            },
          },
          MyVpcVPCGW488ACE0D: {
            Type: "AWS::EC2::VPCGatewayAttachment",
            Properties: {
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
              InternetGatewayId: {
                Ref: "MyVpcIGW5C4A4F63",
              },
            },
          },
          MyCluster4C1BA579: {
            Type: "AWS::ECS::Cluster",
          },
          TaskDefTaskRole1EDB4A67: {
            Type: "AWS::IAM::Role",
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: "sts:AssumeRole",
                    Effect: "Allow",
                    Principal: {
                      Service: "ecs-tasks.amazonaws.com",
                    },
                  },
                ],
                Version: "2012-10-17",
              },
            },
          },
          TaskDef54694570: {
            Type: "AWS::ECS::TaskDefinition",
            Properties: {
              ContainerDefinitions: [
                {
                  Environment: [
                    {
                      Name: "PORT",
                      Value: "8080",
                    },
                    {
                      Name: "NODE_ENV",
                      Value: "production",
                    },
                  ],
                  Essential: true,
                  Image: {
                    "Fn::Join": [
                      "",
                      [
                        "560411514111.dkr.ecr.eu-west-2.",
                        {
                          Ref: "AWS::URLSuffix",
                        },
                        "/study-sync:1.0.0",
                      ],
                    ],
                  },
                  Name: "StudySyncContainer",
                  PortMappings: [
                    {
                      ContainerPort: 8080,
                      Protocol: "tcp",
                    },
                  ],
                },
              ],
              Cpu: "256",
              ExecutionRoleArn: {
                "Fn::GetAtt": ["TaskDefExecutionRoleB4775C97", "Arn"],
              },
              Family: "TestFargateALBStackTaskDef6F7A7524",
              Memory: "512",
              NetworkMode: "awsvpc",
              RequiresCompatibilities: ["FARGATE"],
              TaskRoleArn: {
                "Fn::GetAtt": ["TaskDefTaskRole1EDB4A67", "Arn"],
              },
            },
          },
          TaskDefExecutionRoleB4775C97: {
            Type: "AWS::IAM::Role",
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: "sts:AssumeRole",
                    Effect: "Allow",
                    Principal: {
                      Service: "ecs-tasks.amazonaws.com",
                    },
                  },
                ],
                Version: "2012-10-17",
              },
            },
          },
          TaskDefExecutionRoleDefaultPolicy0DBB737A: {
            Type: "AWS::IAM::Policy",
            Properties: {
              PolicyDocument: {
                Statement: [
                  {
                    Action: [
                      "ecr:BatchCheckLayerAvailability",
                      "ecr:GetDownloadUrlForLayer",
                      "ecr:BatchGetImage",
                    ],
                    Effect: "Allow",
                    Resource:
                      "arn:aws:ecr:eu-west-2:560411514111:repository/study-sync",
                  },
                  {
                    Action: "ecr:GetAuthorizationToken",
                    Effect: "Allow",
                    Resource: "*",
                  },
                ],
                Version: "2012-10-17",
              },
              PolicyName: "TaskDefExecutionRoleDefaultPolicy0DBB737A",
              Roles: [
                {
                  Ref: "TaskDefExecutionRoleB4775C97",
                },
              ],
            },
          },
          FargateALBServiceLBF1310768: {
            Type: "AWS::ElasticLoadBalancingV2::LoadBalancer",
            Properties: {
              LoadBalancerAttributes: [
                {
                  Key: "deletion_protection.enabled",
                  Value: "false",
                },
              ],
              Scheme: "internet-facing",
              SecurityGroups: [
                {
                  "Fn::GetAtt": [
                    "FargateALBServiceLBSecurityGroup82C4A27E",
                    "GroupId",
                  ],
                },
              ],
              Subnets: [
                {
                  Ref: "MyVpcPublicSubnet1SubnetF6608456",
                },
                {
                  Ref: "MyVpcPublicSubnet2Subnet492B6BFB",
                },
                {
                  Ref: "MyVpcPublicSubnet3Subnet57EEE236",
                },
              ],
              Type: "application",
            },
            DependsOn: [
              "MyVpcPublicSubnet1DefaultRoute95FDF9EB",
              "MyVpcPublicSubnet2DefaultRoute052936F6",
              "MyVpcPublicSubnet3DefaultRoute3A83AB36",
            ],
          },
          FargateALBServiceLBSecurityGroup82C4A27E: {
            Type: "AWS::EC2::SecurityGroup",
            Properties: {
              GroupDescription:
                "Automatically created Security Group for ELB TestFargateALBStackFargateALBServiceLBEB693BE7",
              SecurityGroupIngress: [
                {
                  CidrIp: "0.0.0.0/0",
                  Description: "Allow from anyone on port 80",
                  FromPort: 80,
                  IpProtocol: "tcp",
                  ToPort: 80,
                },
              ],
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
            },
          },
          FargateALBServiceLBSecurityGrouptoTestFargateALBStackFargateALBServiceSecurityGroup4889DD188080DB2725D3:
            {
              Type: "AWS::EC2::SecurityGroupEgress",
              Properties: {
                GroupId: {
                  "Fn::GetAtt": [
                    "FargateALBServiceLBSecurityGroup82C4A27E",
                    "GroupId",
                  ],
                },
                IpProtocol: "tcp",
                Description: "Load balancer to target",
                DestinationSecurityGroupId: {
                  "Fn::GetAtt": [
                    "FargateALBServiceSecurityGroupBD719AAD",
                    "GroupId",
                  ],
                },
                FromPort: 8080,
                ToPort: 8080,
              },
            },
          FargateALBServiceLBPublicListener56B08313: {
            Type: "AWS::ElasticLoadBalancingV2::Listener",
            Properties: {
              DefaultActions: [
                {
                  TargetGroupArn: {
                    Ref: "FargateALBServiceLBPublicListenerECSGroup4A0C8679",
                  },
                  Type: "forward",
                },
              ],
              LoadBalancerArn: {
                Ref: "FargateALBServiceLBF1310768",
              },
              Port: 80,
              Protocol: "HTTP",
            },
          },
          FargateALBServiceLBPublicListenerECSGroup4A0C8679: {
            Type: "AWS::ElasticLoadBalancingV2::TargetGroup",
            Properties: {
              Port: 80,
              Protocol: "HTTP",
              TargetType: "ip",
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
            },
          },
          FargateALBServiceE09EB4BD: {
            Type: "AWS::ECS::Service",
            Properties: {
              Cluster: {
                Ref: "MyCluster4C1BA579",
              },
              DeploymentConfiguration: {
                MaximumPercent: 200,
                MinimumHealthyPercent: 50,
              },
              DesiredCount: 1,
              EnableECSManagedTags: false,
              HealthCheckGracePeriodSeconds: 60,
              LaunchType: "FARGATE",
              LoadBalancers: [
                {
                  ContainerName: "StudySyncContainer",
                  ContainerPort: 8080,
                  TargetGroupArn: {
                    Ref: "FargateALBServiceLBPublicListenerECSGroup4A0C8679",
                  },
                },
              ],
              NetworkConfiguration: {
                AwsvpcConfiguration: {
                  AssignPublicIp: "DISABLED",
                  SecurityGroups: [
                    {
                      "Fn::GetAtt": [
                        "FargateALBServiceSecurityGroupBD719AAD",
                        "GroupId",
                      ],
                    },
                  ],
                  Subnets: [
                    {
                      Ref: "MyVpcPrivateSubnet1Subnet5057CF7E",
                    },
                    {
                      Ref: "MyVpcPrivateSubnet2Subnet0040C983",
                    },
                    {
                      Ref: "MyVpcPrivateSubnet3Subnet772D6AD7",
                    },
                  ],
                },
              },
              TaskDefinition: {
                Ref: "TaskDef54694570",
              },
            },
            DependsOn: [
              "FargateALBServiceLBPublicListenerECSGroup4A0C8679",
              "FargateALBServiceLBPublicListener56B08313",
            ],
          },
          FargateALBServiceSecurityGroupBD719AAD: {
            Type: "AWS::EC2::SecurityGroup",
            Properties: {
              GroupDescription:
                "TestFargateALBStack/FargateALBService/Service/SecurityGroup",
              SecurityGroupEgress: [
                {
                  CidrIp: "0.0.0.0/0",
                  Description: "Allow all outbound traffic by default",
                  IpProtocol: "-1",
                },
              ],
              VpcId: {
                Ref: "MyVpcF9F0CA6F",
              },
            },
          },
          FargateALBServiceSecurityGroupfromTestFargateALBStackFargateALBServiceLBSecurityGroupDFD4CC2B8080B0864CB4:
            {
              Type: "AWS::EC2::SecurityGroupIngress",
              Properties: {
                IpProtocol: "tcp",
                Description: "Load balancer to target",
                FromPort: 8080,
                GroupId: {
                  "Fn::GetAtt": [
                    "FargateALBServiceSecurityGroupBD719AAD",
                    "GroupId",
                  ],
                },
                SourceSecurityGroupId: {
                  "Fn::GetAtt": [
                    "FargateALBServiceLBSecurityGroup82C4A27E",
                    "GroupId",
                  ],
                },
                ToPort: 8080,
              },
            },
        },
        Outputs: {
          FargateALBServiceLoadBalancerDNS75F72AC2: {
            Value: {
              "Fn::GetAtt": ["FargateALBServiceLBF1310768", "DNSName"],
            },
          },
          FargateALBServiceServiceURLF6C9FEF7: {
            Value: {
              "Fn::Join": [
                "",
                [
                  "http://",
                  {
                    "Fn::GetAtt": ["FargateALBServiceLBF1310768", "DNSName"],
                  },
                ],
              ],
            },
          },
        },
      },

      MatchStyle.EXACT
    )
  );
});
