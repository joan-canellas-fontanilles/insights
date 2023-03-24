import { TestBed } from '@angular/core/testing';

import { SelectedMetricService } from './selected-metric.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { MetricSelectorService } from '../../../services/metric-selector.service';
import { MetricHttpService } from '../../../http-services/metric-http.service';

describe('SelectedMetricService', () => {
  let service: SelectedMetricService;
  let selector: MetricSelectorService;
  let metricHttpService: MetricHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SelectedMetricService],
    });
    service = TestBed.inject(SelectedMetricService);
    selector = TestBed.inject(MetricSelectorService);
    metricHttpService = TestBed.inject(MetricHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  it('should generate a list of metrics with a selected property', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const metrics = cold('-a-------|', {
        a: [
          { id: '2e015fd6-f785-4625-a587-be35c625f398', name: 'test' },
          { id: '8323b3f8-7e69-4394-906f-52f39a9d69bc', name: 'test2' },
        ],
      });

      jest.spyOn(metricHttpService, 'getAll').mockReturnValue(metrics);

      jest.spyOn(selector, 'get').mockReturnValue(
        cold('-a---b----|', {
          a: ['2e015fd6-f785-4625-a587-be35c625f398'],
          b: [
            '2e015fd6-f785-4625-a587-be35c625f398',
            '8323b3f8-7e69-4394-906f-52f39a9d69bc',
          ],
        })
      );

      expectObservable(service.getMetrics()).toBe('--a---b----|', {
        a: [
          {
            id: '2e015fd6-f785-4625-a587-be35c625f398',
            name: 'test',
            selected: true,
          },
          {
            id: '8323b3f8-7e69-4394-906f-52f39a9d69bc',
            name: 'test2',
            selected: false,
          },
        ],
        b: [
          {
            id: '2e015fd6-f785-4625-a587-be35c625f398',
            name: 'test',
            selected: true,
          },
          {
            id: '8323b3f8-7e69-4394-906f-52f39a9d69bc',
            name: 'test2',
            selected: true,
          },
        ],
      });
    });
  });
});
