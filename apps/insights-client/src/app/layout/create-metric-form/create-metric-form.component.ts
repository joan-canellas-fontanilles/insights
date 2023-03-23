import { Component } from '@angular/core';
import { MetricHttpService } from '../../http-services/metric-http.service';
import { FormControl, Validators } from '@angular/forms';
import { MetricsPageService } from '../../pages/metrics-page/metrics-page.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'insights-create-metric-form',
  templateUrl: './create-metric-form.component.html',
  styleUrls: ['./create-metric-form.component.scss'],
})
export class CreateMetricFormComponent {
  public field = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  constructor(
    private readonly metricHttpService: MetricHttpService,
    private readonly metricsPageService: MetricsPageService
  ) {}

  public save(): void {
    if (this.field.invalid || this.field.value === null) return;
    this.metricHttpService.create({ name: this.field.value }).subscribe({
      next: () => {
        this.field.reset();
        this.metricsPageService.refresh();
      },
      error: (err: HttpErrorResponse) => {
        this.field.setErrors({ request: err.error.message });
      },
    });
  }
}
