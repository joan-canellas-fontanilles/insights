import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BaseHostInterceptor } from './http-services/base-host.interceptor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    SharedModule,
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
