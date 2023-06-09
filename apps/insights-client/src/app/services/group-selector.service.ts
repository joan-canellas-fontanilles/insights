import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimePeriod } from '@insights/insights-api-data';

@Injectable({ providedIn: 'root' })
export class GroupSelectorService {
  private groupSelectorSubject = new BehaviorSubject<TimePeriod>(
    TimePeriod.Minute
  );

  public get(): Observable<TimePeriod> {
    return this.groupSelectorSubject.asObservable();
  }

  public getCurrent(): TimePeriod {
    return this.groupSelectorSubject.getValue();
  }

  public set(timePeriod: TimePeriod): void {
    this.groupSelectorSubject.next(timePeriod);
  }
}
