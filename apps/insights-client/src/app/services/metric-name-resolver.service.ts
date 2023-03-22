import { Injectable } from '@angular/core';
import { GetAllMetricsResponse } from '@insights/insights-api-data';
import { TitleCasePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MetricNameResolverService {
  private metricNames: Record<string, string> = {};

  public getMetricName(metricId: string): string {
    return this.metricNames[metricId];
  }

  public addMetrics(metrics: GetAllMetricsResponse): void {
    metrics.forEach((metric) => {
      this.metricNames[metric.id] = new TitleCasePipe().transform(metric.name);
    });
  }
}
