import { Component } from '@angular/core';
import { TimeFilterSelectorService } from '../../services/time-filter-selector.service';

@Component({
  selector: 'insights-time-filter-picker',
  templateUrl: './time-filter-picker.component.html',
  styleUrls: ['./time-filter-picker.component.scss'],
})
export class TimeFilterPickerComponent {
  constructor(private readonly timeFilterSelector: TimeFilterSelectorService) {
    this.setTime();
  }

  public setTime(): void {
    this.timeFilterSelector.set({
      from: this.calcDate(10),
      to: new Date(),
    });
  }

  private calcDate(minutes: number): Date {
    return new Date(new Date().getTime() - minutes * 60 * 1000);
  }
}
