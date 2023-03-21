import { Component } from '@angular/core';
import { MetricHttpService } from '../../http-services/metric-http.service';
import { MetricSelectorService } from '../../services/metric-selector.service';
import { MetricSelectorItem } from './metric-selector-item';
import { SelectedMetricService } from './selected-metric.service';

@Component({
  selector: 'insights-metric-selector',
  templateUrl: './metric-selector.component.html',
  styleUrls: ['./metric-selector.component.scss'],
  providers: [SelectedMetricService],
})
export class MetricSelectorComponent {
  public readonly metrics$ = this.selectedMetricService.getMetrics();

  constructor(
    private readonly metricHttpService: MetricHttpService,
    private readonly metricSelectorService: MetricSelectorService,
    private readonly selectedMetricService: SelectedMetricService
  ) {}

  public clickItem(metric: MetricSelectorItem): void {
    if (metric.selected) {
      this.metricSelectorService.remove(metric.id);
    } else {
      this.metricSelectorService.add(metric.id);
    }
  }
}
