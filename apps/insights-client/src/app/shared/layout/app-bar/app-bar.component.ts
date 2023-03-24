import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'insights-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent {
  public dashboardRouteActive$ = this.isLinkActive('dashboard');
  public metricRouteActive$ = this.isLinkActive('metrics');

  constructor(private readonly router: Router) {}

  public isLinkActive(route: string): Observable<boolean> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.url.includes(route))
    );
  }
}
