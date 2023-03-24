import { Component } from '@angular/core';
import { LastRefreshService } from './last-refresh.service';

@Component({
  selector: 'insights-last-refresh',
  templateUrl: './last-refresh.component.html',
  styleUrls: ['./last-refresh.component.scss'],
})
export class LastRefreshComponent {
  public lastRefresh$ = this.lastRefreshService.getLastRefresh();

  constructor(private lastRefreshService: LastRefreshService) {}
}
