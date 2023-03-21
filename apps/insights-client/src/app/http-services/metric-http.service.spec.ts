import { TestBed } from '@angular/core/testing';

import { MetricHttpService } from './metric-http.service';

describe('MetricHttpService', () => {
  let service: MetricHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
