import { TestBed } from '@angular/core/testing';

import { MetricNameResolverService } from './metric-name-resolver.service';
import { MetricResponse } from '@insights/insights-api-data';

describe('MetricNameResolverService', () => {
  let service: MetricNameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricNameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to store a list of metrics', () => {
    expect(
      service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')
    ).toBeUndefined();

    const metrics: MetricResponse[] = [
      { id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a', name: 'test' },
    ];
    service.addMetrics(metrics);
    expect(service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')).toBe(
      'test'
    );
  });

  it('should maintain the previous stored values', () => {
    expect(
      service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')
    ).toBeUndefined();

    service.addMetrics([
      { id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a', name: 'test' },
    ]);

    service.addMetrics([
      { id: 'b18dc7d6-5f11-4bce-b4d0-6640bbf6aeed', name: 'test2' },
    ]);

    expect(service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')).toBe(
      'test'
    );
  });

  it('should replace the name with the last value', () => {
    service.addMetrics([
      { id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a', name: 'test' },
    ]);

    expect(service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')).toBe(
      'test'
    );

    service.addMetrics([
      { id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a', name: 'test2' },
    ]);

    expect(service.getMetricName('3785e66e-7d19-4e2b-b592-9da0eeafeb0a')).toBe(
      'test2'
    );
  });
});
