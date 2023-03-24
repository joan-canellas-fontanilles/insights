import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardSelectorComponent } from './layout/dashboard-selector/dashboard-selector.component';
import { DashboardChartComponent } from './layout/dashboard-chart/dashboard-chart.component';
import { MetricQueryService } from './pages/dashboard-page/metric-query.service';
import { LastRefreshService } from './components/last-refresh/last-refresh.service';
import { LastRefreshComponent } from './components/last-refresh/last-refresh.component';
import { MetricSelectorComponent } from './components/metric-selector/metric-selector.component';
import { MultilineGraphComponent } from './components/multiline-graph/multiline-graph.component';
import { TimeFilterPickerComponent } from './components/time-filter-picker/time-filter-picker.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardSelectorComponent,
    DashboardChartComponent,
    LastRefreshComponent,
    MetricSelectorComponent,
    MultilineGraphComponent,
    TimeFilterPickerComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [MetricQueryService, LastRefreshService],
  exports: [DashboardPageComponent],
})
export class DashboardPageModule {}
