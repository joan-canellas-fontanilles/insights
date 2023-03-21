import { Injectable } from '@angular/core';
import { GetAllMetricsResponse } from '@insights/insights-api-data';

@Injectable({ providedIn: 'root' })
export class MetricNameResolverService {
  private metricNames: Record<string, string> = {};

  public getMetricName(metricId: string): string {
    return this.metricNames[metricId];
  }

  public addMetrics(metrics: GetAllMetricsResponse): void {
    metrics.forEach((metric) => {
      this.metricNames[metric.id] = metric.name;
    });
  }
}
