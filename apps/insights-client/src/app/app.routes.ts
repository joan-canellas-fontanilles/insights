import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
];
