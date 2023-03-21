import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { TimeFilter } from '@insights/insights-api-data';

@Injectable({ providedIn: 'root' })
export class TimeFilterSelectorService {
  private selectedMetricIdsSubject = new BehaviorSubject<
    TimeFilter | undefined
  >(undefined);

  public get(): Observable<TimeFilter> {
    return this.selectedMetricIdsSubject.asObservable().pipe(filter(Boolean));
  }

  public set(timeFilter: TimeFilter): void {
    this.selectedMetricIdsSubject.next(timeFilter);
  }
}
