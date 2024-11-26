import * as cdk from 'aws-cdk-lib';
import { EventAction, FilterGroup, LinuxArmBuildImage, Project, ProjectVisibility, Source } from 'aws-cdk-lib/aws-codebuild';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class GithubCodebuildSelfhostedStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Project(this, 'CodeBuildProject', {
      projectName: 'github-codebuild-selfhosted',
      source: Source.gitHub({
        owner: 'matheusdasmerces',
        repo: 'test-github-codebuild-selfhosted',
        webhook: true,
        webhookFilters: [
          FilterGroup.inEventOf(EventAction.WORKFLOW_JOB_QUEUED),
        ],
      }),
      environment: {
        buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
        privileged: true,
      },
      logging: {
        cloudWatch: {
          logGroup: new LogGroup(this, 'CodeBuildLogGroup', {
            logGroupName: '/aws/codebuild/github-codebuild-selfhosted',
            retention: RetentionDays.ONE_WEEK,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
          }),
        },
      },
      queuedTimeout: cdk.Duration.minutes(20),
      visibility: ProjectVisibility.PRIVATE,
    });
  }
}
