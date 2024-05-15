import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Dashboard, GraphWidget, Metric } from 'aws-cdk-lib/aws-cloudwatch';

interface WidgetMetric {
    namespace: string;
    metricName: string;
    dimensionsMap: Record<string, any>;
    region: string;
    statistic: string;
}

interface WidgetProperties {
    title: string;
    metrics: WidgetMetric[];
}

interface WidgetConfig {
    width: number;
    height: number;
    properties: WidgetProperties;
}

interface WidgetsConfig {
    widgets: WidgetConfig[];
}

export class MyDashboardStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    

    // Creating a new dashboard with a unique name
    const dashboard = new Dashboard(this, 'MyNewDashboard', {
      dashboardName: 'MyUniqueSQSDashboard' // Ensure this name is unique
    });

    // Sample data, replace with your actual widgets configuration
    const widgetsConfig: WidgetsConfig = {
        widgets: [
            {
                width: 12,
                height: 5,
                properties: {
                    title: "Example Widget Title",
                    metrics: [
                        {
                            namespace: "AWS/SQS",
                            metricName: "NumberOfMessagesSent",
                            dimensionsMap: {"QueueName": "YourQueueName"},
                            region: "us-east-1",
                            statistic: "Sum"
                        }
                    ]
                }
            }
        ]
    };

    // Iterate and create widgets based on the configuration
    widgetsConfig.widgets.forEach((widget) => {
      const cwWidget = new GraphWidget({
        width: widget.width,
        height: widget.height,
        title: widget.properties.title
      });

      widget.properties.metrics.forEach((metric) => {
        cwWidget.addMetric(new Metric({
          namespace: metric.namespace,
          metricName: metric.metricName,
          dimensionsMap: metric.dimensionsMap,
          region: metric.region,
          statistic: metric.statistic,
        }));
      });

      dashboard.addWidgets(cwWidget);
    });

  }
}
