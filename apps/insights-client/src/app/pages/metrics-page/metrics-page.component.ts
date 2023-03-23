import { Component } from '@angular/core';
import { MetricsPageService } from './metrics-page.service';

@Component({
  selector: 'insights-metrics-page',
  templateUrl: './metrics-page.component.html',
  styleUrls: ['./metrics-page.component.scss'],
  providers: [MetricsPageService],
})
export class MetricsPageComponent {
  public metrics$ = this.metricsPageService.getAllMetrics();
  public metricId?: string;

  constructor(private readonly metricsPageService: MetricsPageService) {}

  public optionSelected(metricId: string): void {
    this.metricId = metricId;
  }
}
