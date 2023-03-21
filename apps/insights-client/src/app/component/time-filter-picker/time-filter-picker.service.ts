import { Injectable } from '@angular/core';
import { TimeFilterSelectorService } from '../../services/time-filter-selector.service';
import { Observable, tap, timer } from 'rxjs';

@Injectable()
export class TimeFilterPickerService {
  private readonly refreshRateMilliseconds = 10 * 1_000;
  private readonly dateRange = 20 * 60 * 1_000;

  constructor(private readonly timeFilterSelector: TimeFilterSelectorService) {}

  public refresh(): Observable<number> {
    return timer(0, this.refreshRateMilliseconds).pipe(
      tap(() => {
        this.setTime();
      })
    );
  }

  private setTime(): void {
    this.timeFilterSelector.set({
      from: this.calcDate(),
      to: new Date(),
    });
  }

  private calcDate(): Date {
    return new Date(new Date().getTime() - this.dateRange);
  }
}
