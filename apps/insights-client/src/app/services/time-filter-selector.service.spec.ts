import { TestBed } from '@angular/core/testing';

import { TimeFilterSelectorService } from './time-filter-selector.service';

describe('TimeFilterSelectorService', () => {
  let service: TimeFilterSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFilterSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not emit until a time filter is provided', (done) => {
    let called = false;
    service.get().subscribe(() => {
      called = true;
      done();
    });

    expect(called).toBeFalsy();

    service.set({ from: new Date(), to: new Date() });
    expect(called).toBeTruthy();
  });

  it('should return the last emitted time filter', (done) => {
    service.set({ from: new Date(), to: new Date() });
    service.set({
      from: new Date('2023-03-21T14:09:38.257Z'),
      to: new Date('2023-03-21T14:09:38.257Z'),
    });

    service.get().subscribe((timeFilter) => {
      expect(timeFilter).toEqual({
        from: new Date('2023-03-21T14:09:38.257Z'),
        to: new Date('2023-03-21T14:09:38.257Z'),
      });
      done();
    });
  });
});
