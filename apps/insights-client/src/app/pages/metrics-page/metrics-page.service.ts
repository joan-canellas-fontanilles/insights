import { Injectable } from '@angular/core';
import { MetricHttpService } from '../../http-services/metric-http.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GetAllMetricsResponse } from '@insights/insights-api-data';

@Injectable()
export class MetricsPageService {
  private refreshSubject = new BehaviorSubject<null>(null);

  constructor(private readonly metricHttpService: MetricHttpService) {}

  public refresh(): void {
    this.refreshSubject.next(null);
  }

  public getAllMetrics(): Observable<GetAllMetricsResponse> {
    return this.refreshSubject.pipe(
      switchMap(() => this.metricHttpService.getAll())
    );
  }
}
