import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeFilterPickerService } from './time-filter-picker.service';
import { TimePeriod } from '@insights/insights-api-data';
import { GroupSelectorService } from '../../services/group-selector.service';

@Component({
  selector: 'insights-time-filter-picker',
  templateUrl: './time-filter-picker.component.html',
  styleUrls: ['./time-filter-picker.component.scss'],
  providers: [TimeFilterPickerService],
})
export class TimeFilterPickerComponent implements OnInit, OnDestroy {
  public readonly TimePeriods: TimePeriod[] = Object.values(TimePeriod);
  public readonly time$ = this.groupSelectorService.get();

  private readonly subscription = new Subscription();

  constructor(
    private readonly timeFilterPickerService: TimeFilterPickerService,
    private readonly groupSelectorService: GroupSelectorService
  ) {}

  ngOnInit() {
    this.subscription.add(this.timeFilterPickerService.refresh().subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  click(time: TimePeriod): void {
    this.groupSelectorService.set(time);
  }
}
