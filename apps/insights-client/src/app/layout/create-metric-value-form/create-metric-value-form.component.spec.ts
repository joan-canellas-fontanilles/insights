import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetricValueFormComponent } from './create-metric-value-form.component';

describe('CreateMetricValueFormComponent', () => {
  let component: CreateMetricValueFormComponent;
  let fixture: ComponentFixture<CreateMetricValueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMetricValueFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMetricValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
