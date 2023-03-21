import { Injectable } from '@angular/core';
import { TimeFilter } from '@insights/insights-api-data';
import * as moment from 'moment/moment';
import { GroupSelectorService } from './group-selector.service';
import { timeFormat } from './time-format';

@Injectable({ providedIn: 'root' })
export class GenerateTimeValuesService {
  private readonly dateRange = 20;

  constructor(private readonly groupSelectorService: GroupSelectorService) {}

  public calculateDatesBetween(): string[] {
    return new Array(this.dateRange)
      .fill(1)
      .map((v, index) => this.dateRange - index - 1)
      .map((before) => this.calculateDate(before))
      .map((date) => this.formatDate(date));
  }

  public formatDate(date: Date): string {
    const time = this.groupSelectorService.getCurrent();
    return moment(date).format(timeFormat[time]);
  }

  public getTimeFilter(): TimeFilter {
    return {
      from: this.calculateDate(this.dateRange),
      to: new Date(),
    };
  }

  public calculateDate(before: number): Date {
    const time = this.groupSelectorService.getCurrent();
    return moment().subtract(before, time).startOf(time).toDate();
  }
}
