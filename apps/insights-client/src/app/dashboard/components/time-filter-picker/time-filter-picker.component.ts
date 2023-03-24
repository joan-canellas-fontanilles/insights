import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeFilterPickerService } from './time-filter-picker.service';
import { TimePeriod } from '@insights/insights-api-data';
import { GroupSelectorService } from '../../../services/group-selector.service';
import { SelectorElement } from '../../../shared/components/selector/selector-element';

@Component({
  selector: 'insights-time-filter-picker',
  templateUrl: './time-filter-picker.component.html',
  styleUrls: ['./time-filter-picker.component.scss'],
  providers: [TimeFilterPickerService],
})
export class TimeFilterPickerComponent implements OnInit, OnDestroy {
  public readonly timeOptions$ = this.timeFilterPickerService.getTimeOptions();

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

  clickItem(time: SelectorElement): void {
    this.groupSelectorService.set(time.id as TimePeriod);
  }
}
