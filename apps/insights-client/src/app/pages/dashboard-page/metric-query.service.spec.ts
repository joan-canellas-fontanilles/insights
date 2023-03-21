import { TestBed } from '@angular/core/testing';

import { MetricQueryService } from './metric-query.service';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricSelectorService } from '../../services/metric-selector.service';
import { TimeFilterSelectorService } from '../../services/time-filter-selector.service';
import {
  AggregationType,
  MetricQueryData,
  TimePeriod,
} from '@insights/insights-api-data';
import { GroupSelectorService } from '../../services/group-selector.service';

describe('MetricQueryService', () => {
  let service: MetricQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetricQueryService],
    });
    service = TestBed.inject(MetricQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  it('should return a new parameters object when selected metric ids, time filter or group change', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      jest.spyOn(TestBed.inject(MetricSelectorService), 'get').mockReturnValue(
        cold('a-b-----|', {
          a: ['2e015fd6-f785-4625-a587-be35c625f398'],
          b: [
            '2e015fd6-f785-4625-a587-be35c625f398',
            '8323b3f8-7e69-4394-906f-52f39a9d69bc',
          ],
        })
      );

      jest
        .spyOn(TestBed.inject(TimeFilterSelectorService), 'get')
        .mockReturnValue(
          cold('a---b---|', {
            a: {
              from: new Date('2023-03-20T12:00:00.000Z'),
              to: new Date('2023-03-20T14:00:00.000Z'),
            },
            b: {
              from: new Date('2023-03-21T12:00:00.000Z'),
              to: new Date('2023-03-21T14:00:00.000Z'),
            },
          })
        );

      jest.spyOn(TestBed.inject(GroupSelectorService), 'get').mockReturnValue(
        cold('a-----b-|', {
          a: TimePeriod.Hour,
          b: TimePeriod.Day,
        })
      );

      const paramA: MetricQueryData = {
        metricIds: ['2e015fd6-f785-4625-a587-be35c625f398'],
        timeFilter: {
          from: new Date('2023-03-20T12:00:00.000Z'),
          to: new Date('2023-03-20T14:00:00.000Z'),
        },
        group: TimePeriod.Hour,
        aggregation: AggregationType.Average,
      };

      const paramB: MetricQueryData = {
        metricIds: [
          '2e015fd6-f785-4625-a587-be35c625f398',
          '8323b3f8-7e69-4394-906f-52f39a9d69bc',
        ],
        timeFilter: {
          from: new Date('2023-03-20T12:00:00.000Z'),
          to: new Date('2023-03-20T14:00:00.000Z'),
        },
        group: TimePeriod.Hour,
        aggregation: AggregationType.Average,
      };

      const paramC: MetricQueryData = {
        metricIds: [
          '2e015fd6-f785-4625-a587-be35c625f398',
          '8323b3f8-7e69-4394-906f-52f39a9d69bc',
        ],
        timeFilter: {
          from: new Date('2023-03-21T12:00:00.000Z'),
          to: new Date('2023-03-21T14:00:00.000Z'),
        },
        group: TimePeriod.Hour,
        aggregation: AggregationType.Average,
      };

      const paramD: MetricQueryData = {
        metricIds: [
          '2e015fd6-f785-4625-a587-be35c625f398',
          '8323b3f8-7e69-4394-906f-52f39a9d69bc',
        ],
        timeFilter: {
          from: new Date('2023-03-21T12:00:00.000Z'),
          to: new Date('2023-03-21T14:00:00.000Z'),
        },
        group: TimePeriod.Day,
        aggregation: AggregationType.Average,
      };

      const observable = service['queryParameters']();
      expectObservable(observable).toBe('a-b-c-d-|', {
        a: paramA,
        b: paramB,
        c: paramC,
        d: paramD,
      });
    });
  });
});
