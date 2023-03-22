import { Component, Input } from '@angular/core';
import { MetricQueryResponse } from '@insights/insights-api-data';

@Component({
  selector: 'insights-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent {
  @Input() public data: MetricQueryResponse = [];
}
