#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyDashboardStack } from '../lib/my-dashboard-stack'; // Importing the dashboard stack

const app = new cdk.App();
new MyDashboardStack(app, 'MyDashboardStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});
