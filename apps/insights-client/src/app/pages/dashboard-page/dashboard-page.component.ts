import { Component } from '@angular/core';
import { MetricQueryService } from './metric-query.service';

@Component({
  selector: 'insights-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [MetricQueryService],
})
export class DashboardPageComponent {
  public readonly metricQuery$ = this.metricQueryService.query$;

  constructor(private readonly metricQueryService: MetricQueryService) {}
}
