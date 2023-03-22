import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from './environment/environement';
import { BaseHostInterceptor } from './http-services/base-host.interceptor';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TimeFilterPickerComponent } from './component/time-filter-picker/time-filter-picker.component';
import { MetricSelectorComponent } from './component/metric-selector/metric-selector.component';
import { CommonModule } from '@angular/common';
import { MultilineGraphComponent } from './component/multiline-graph/multiline-graph.component';
import { SelectorComponent } from './component/selector/selector.component';
import { SelectorCheckboxComponent } from './component/selector/selector-checkbox/selector-checkbox.component';
import { SelectorRadioComponent } from './component/selector/selector-radio/selector-radio.component';
import { MetricsPageComponent } from './pages/metrics-page/metrics-page.component';
import { ButtonComponent } from './component/button/button.component';
import { DropdownSelectorComponent } from './component/dropdown-selector/dropdown-selector.component';
import { LastRefreshComponent } from './component/last-refresh/last-refresh.component';
import { DashboardSelectorComponent } from './layout/dashboard-selector/dashboard-selector.component';
import { DashboardChartComponent } from './layout/dashboard-chart/dashboard-chart.component';
import { AppBarComponent } from './layout/app-bar/app-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TimeFilterPickerComponent,
    MetricSelectorComponent,
    MultilineGraphComponent,
    AppBarComponent,
    SelectorComponent,
    SelectorCheckboxComponent,
    SelectorRadioComponent,
    MetricsPageComponent,
    ButtonComponent,
    DropdownSelectorComponent,
    LastRefreshComponent,
    DashboardSelectorComponent,
    DashboardChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseHostInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
