import { Injectable } from '@angular/core';
import { MetricHttpService } from '../../http-services/metric-http.service';
import { map, Observable, switchMap } from 'rxjs';
import { MetricResponse } from '@insights/insights-api-data';
import { MetricSelectorItem } from './metric-selector-item';
import { MetricSelectorService } from '../../services/metric-selector.service';

@Injectable()
export class SelectedMetricService {
  constructor(
    private readonly metricHttpService: MetricHttpService,
    private readonly metricSelectorService: MetricSelectorService
  ) {}

  public getMetrics() {
    return this.metricHttpService
      .getAll()
      .pipe(switchMap((metrics) => this.getSelectedMetrics(metrics)));
  }

  private getSelectedMetrics(
    metrics: MetricResponse[]
  ): Observable<MetricSelectorItem[]> {
    return this.metricSelectorService
      .get()
      .pipe(
        map((selectedIds) =>
          this.generateMetricSelectorItems(metrics, selectedIds)
        )
      );
  }

  private generateMetricSelectorItems(
    metrics: MetricResponse[],
    selectedIds: string[]
  ): MetricSelectorItem[] {
    return metrics.map((metric) => ({
      ...metric,
      selected: selectedIds.includes(metric.id),
    }));
  }
}
