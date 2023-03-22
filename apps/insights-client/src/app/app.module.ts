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
import { AppBarComponent } from './component/app-bar/app-bar.component';
import { SelectorComponent } from './component/selector/selector.component';
import { SelectorCheckboxComponent } from './component/selector/selector-checkbox/selector-checkbox.component';
import { SelectorRadioComponent } from './component/selector/selector-radio/selector-radio.component';
import { MetricsPageComponent } from './pages/metrics-page/metrics-page.component';
import { ButtonComponent } from './component/button/button.component';

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
