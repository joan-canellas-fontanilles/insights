import { Component } from '@angular/core';
import { MetricHttpService } from './http-services/metric-http.service';

@Component({
  selector: 'insights-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly metrics$ = this.metricHttpService.getAll();

  constructor(private readonly metricHttpService: MetricHttpService) {}
}
