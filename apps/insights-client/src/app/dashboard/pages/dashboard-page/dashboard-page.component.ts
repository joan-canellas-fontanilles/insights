import { Component } from '@angular/core';
import { MetricQueryService } from './metric-query.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  public readonly metricQuery$ = this.metricQueryService.query$;

  constructor(private readonly metricQueryService: MetricQueryService) {}
}
