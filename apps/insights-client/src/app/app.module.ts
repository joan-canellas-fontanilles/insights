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

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TimeFilterPickerComponent,
    MetricSelectorComponent,
    MultilineGraphComponent,
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
