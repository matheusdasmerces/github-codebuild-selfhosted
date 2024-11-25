import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as GithubCodebuildSelfhosted from '../lib/github-codebuild-selfhosted-stack';

test('CodeBuild Project Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new GithubCodebuildSelfhosted.GithubCodebuildSelfhostedStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CodeBuild::Project', {
    Name: "github-codebuild-selfhosted",
  });
});
