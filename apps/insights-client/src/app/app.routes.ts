import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-page.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'metrics',
    loadChildren: () =>
      import('./metrics/metrics-page.module').then((m) => m.MetricsPageModule),
  },
];
