import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap, timer } from 'rxjs';
import { TimePeriod } from '@insights/insights-api-data';
import { TimeFilterSelectorService } from '../../../services/time-filter-selector.service';
import { GroupSelectorService } from '../../../services/group-selector.service';
import { GenerateTimeValuesService } from '../../../services/generate-time-values.service';
import { SelectorElement } from '../../../shared/components/selector/selector-element';

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

  public getTimeOptions(): Observable<SelectorElement[]> {
    return this.groupSelectorService.get().pipe(
      map((time) =>
        Object.values(TimePeriod).map((timePeriod) => ({
          id: timePeriod,
          name: timePeriod,
          selected: timePeriod === time,
        }))
      )
    );
  }
}
