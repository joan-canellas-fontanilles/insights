import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { numberValidator } from '../../validators/number-validator';
import { dateValidator } from '../../validators/date-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { MetricValueHttpService } from '../../http-services/metric-value-http.service';

@Component({
  selector: 'insights-create-metric-value-form',
  templateUrl: './create-metric-value-form.component.html',
  styleUrls: ['./create-metric-value-form.component.scss'],
})
export class CreateMetricValueFormComponent {
  @Input() public metricId!: string;

  public valueField = new FormControl(null, [
    Validators.required,
    numberValidator,
  ]);
  public timestampField = new FormControl(new Date(), [
    Validators.required,
    dateValidator,
  ]);

  public readonly formGroup = new FormGroup({
    value: this.valueField,
    timestamp: this.timestampField,
  });

  constructor(
    private readonly metricValueHttpService: MetricValueHttpService
  ) {}

  public save(): void {
    if (
      this.formGroup.invalid ||
      this.valueField.value === null ||
      this.timestampField.value === null
    ) {
      return;
    }

    this.metricValueHttpService
      .create(this.metricId, {
        value: Number(this.valueField.value),
        timestamp: new Date(this.timestampField.value),
      })
      .subscribe({
        next: () => {
          this.formGroup.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.formGroup.setErrors({ request: err.error.message });
        },
      });
  }
}
