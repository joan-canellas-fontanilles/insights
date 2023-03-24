import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LastRefreshService {
  private lastRefreshSubject = new Subject<Date>();

  public setLastRefresh(lastRefresh: Date): void {
    this.lastRefreshSubject.next(lastRefresh);
  }

  public getLastRefresh(): Observable<Date> {
    return this.lastRefreshSubject.asObservable();
  }
}
