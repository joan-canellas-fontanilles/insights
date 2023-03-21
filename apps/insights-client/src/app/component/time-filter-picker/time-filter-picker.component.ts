import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeFilterPickerService } from './time-filter-picker.service';

@Component({
  selector: 'insights-time-filter-picker',
  templateUrl: './time-filter-picker.component.html',
  styleUrls: ['./time-filter-picker.component.scss'],
  providers: [TimeFilterPickerService],
})
export class TimeFilterPickerComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();

  constructor(
    private readonly timeFilterPickerService: TimeFilterPickerService
  ) {}

  ngOnInit() {
    this.subscription.add(this.timeFilterPickerService.refresh().subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
