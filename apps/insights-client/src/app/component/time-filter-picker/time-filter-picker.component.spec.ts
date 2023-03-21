import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFilterPickerComponent } from './time-filter-picker.component';

describe('TimeFilterPickerComponent', () => {
  let component: TimeFilterPickerComponent;
  let fixture: ComponentFixture<TimeFilterPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeFilterPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeFilterPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
