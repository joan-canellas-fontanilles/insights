import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricSelectorService {
  private selectedMetricIdsSubject = new BehaviorSubject<string[]>([]);

  public get(): Observable<string[]> {
    return this.selectedMetricIdsSubject.asObservable();
  }

  public add(metricId: string): void {
    const currentMetricIds = this.selectedMetricIdsSubject.getValue();
    const set = new Set(currentMetricIds);
    set.add(metricId);
    this.selectedMetricIdsSubject.next([...set]);
  }

  public remove(metricId: string): void {
    const currentMetricIds = this.selectedMetricIdsSubject.getValue();
    const set = new Set(currentMetricIds);
    set.delete(metricId);
    this.selectedMetricIdsSubject.next([...set]);
  }
}
