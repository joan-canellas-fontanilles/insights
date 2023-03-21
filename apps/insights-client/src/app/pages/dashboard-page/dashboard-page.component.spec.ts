import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricSelectorComponent } from '../../component/metric-selector/metric-selector.component';
import { TimeFilterPickerComponent } from '../../component/time-filter-picker/time-filter-picker.component';
import { MultilineGraphComponent } from '../../component/multiline-graph/multiline-graph.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        DashboardPageComponent,
        MetricSelectorComponent,
        TimeFilterPickerComponent,
        MultilineGraphComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
