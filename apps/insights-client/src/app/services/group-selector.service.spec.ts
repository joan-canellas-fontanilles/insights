import { TestBed } from '@angular/core/testing';

import { GroupSelectorService } from './group-selector.service';
import { TimePeriod } from '@insights/insights-api-data';

describe('GroupSelectorService', () => {
  let service: GroupSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Minute by default', (done) => {
    service.get().subscribe((timePeriod) => {
      expect(timePeriod).toEqual(TimePeriod.Minute);
      done();
    });
  });

  it('should be able to change the timePeriod selected', (done) => {
    service.set(TimePeriod.Hour);
    service.get().subscribe((timePeriod) => {
      expect(timePeriod).toEqual(TimePeriod.Hour);
      done();
    });
  });
});
