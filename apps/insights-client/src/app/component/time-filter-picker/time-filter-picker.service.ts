import { Injectable } from '@angular/core';
import { TimeFilterSelectorService } from '../../services/time-filter-selector.service';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { GroupSelectorService } from '../../services/group-selector.service';
import { GenerateTimeValuesService } from '../../services/generate-time-values.service';

@Injectable()
export class TimeFilterPickerService {
  private readonly refreshRateMilliseconds = 10 * 1_000;

  constructor(
    private readonly timeFilterSelector: TimeFilterSelectorService,
    private readonly groupSelectorService: GroupSelectorService,
    private readonly generateTimeValuesService: GenerateTimeValuesService
  ) {}

  public refresh(): Observable<number> {
    return this.groupSelectorService
      .get()
      .pipe(
        switchMap(() =>
          timer(0, this.refreshRateMilliseconds).pipe(tap(() => this.setTime()))
        )
      );
  }

  private setTime(): void {
    this.timeFilterSelector.set(this.generateTimeValuesService.getTimeFilter());
  }
}
