import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import {
  AggregationType,
  CreateMetricValueResponse,
  MetricQueryData,
} from '@insights/insights-api-data';
import { MetricSelectorService } from '../../services/metric-selector.service';
import { MetricQueryHttpService } from '../../http-services/metric-query-http.service';
import { TimeFilterSelectorService } from '../../services/time-filter-selector.service';
import { GroupSelectorService } from '../../services/group-selector.service';

@Injectable()
export class MetricQueryService {
  public query$ = this.generateQuery();

  constructor(
    private readonly metricQueryHttpService: MetricQueryHttpService,
    private readonly metricSelectorService: MetricSelectorService,
    private readonly timeFilterSelectorService: TimeFilterSelectorService,
    private readonly groupSelectorService: GroupSelectorService
  ) {}

  private queryParameters(): Observable<MetricQueryData> {
    return combineLatest([
      this.metricSelectorService.get(),
      this.groupSelectorService.get(),
      this.timeFilterSelectorService.get(),
    ]).pipe(
      map(([metricIds, group, timeFilter]) => ({
        metricIds,
        group,
        timeFilter,
        aggregation: AggregationType.Average,
      }))
    );
  }

  private generateQuery(): Observable<CreateMetricValueResponse> {
    return this.queryParameters().pipe(
      switchMap((params) => this.metricQueryHttpService.query(params))
    );
  }
}
