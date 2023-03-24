import { TestBed } from '@angular/core/testing';

import { TimeFilterPickerService } from './time-filter-picker.service';

describe('TimeFilterPickerService', () => {
  let service: TimeFilterPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeFilterPickerService],
    });
    service = TestBed.inject(TimeFilterPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
