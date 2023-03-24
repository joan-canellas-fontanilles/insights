import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
