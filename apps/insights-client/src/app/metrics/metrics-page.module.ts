import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsPageComponent } from './pages/metrics-page/metrics-page.component';
import { CreateMetricFormComponent } from './layout/create-metric-form/create-metric-form.component';
import { CreateMetricValueFormComponent } from './layout/create-metric-value-form/create-metric-value-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MetricsPageComponent,
  },
];

@NgModule({
  declarations: [
    MetricsPageComponent,
    CreateMetricFormComponent,
    CreateMetricValueFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MetricsPageModule {}
