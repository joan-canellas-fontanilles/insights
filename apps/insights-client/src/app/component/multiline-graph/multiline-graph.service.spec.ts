import { TestBed } from '@angular/core/testing';

import { MultilineGraphService } from './multiline-graph.service';
import { MetricNameResolverService } from '../../services/metric-name-resolver.service';

describe('MultilineGraphService', () => {
  let service: MultilineGraphService;
  let metricNameResolverService: MetricNameResolverService;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-03-21T10:01:00.000Z'));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MultilineGraphService] });
    service = TestBed.inject(MultilineGraphService);
    metricNameResolverService = TestBed.inject(MetricNameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateOptions', () => {
    it('should generate a valid option configuration', () => {
      metricNameResolverService.addMetrics([
        { id: 'b18dc7d6-5f11-4bce-b4d0-6640bbf6aeed', name: 'test' },
        { id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a', name: 'test2' },
      ]);

      const result = service.generateOptions([
        {
          metric: 'b18dc7d6-5f11-4bce-b4d0-6640bbf6aeed',
          data: [
            {
              time: new Date('2023-03-21T09:50:00.000Z'),
              value: 10,
            },
            {
              time: new Date('2023-03-21T09:57:00.000Z'),
              value: 20,
            },
          ],
        },
        {
          metric: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a',
          data: [
            {
              time: new Date('2023-03-21T09:52:00.000Z'),
              value: 40,
            },
            {
              time: new Date('2023-03-21T09:59:00.000Z'),
              value: 50,
            },
          ],
        },
      ]);

      expect(result).toEqual({
        backgroundColor: 'transparent',
        color: ['#00F2DE', '#008DF2', '#00F265'],
        legend: {},
        series: [
          {
            data: [
              0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0,
            ],
            id: 'b18dc7d6-5f11-4bce-b4d0-6640bbf6aeed',
            name: 'Test',
            type: 'line',
          },
          {
            data: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 50, 0, 0,
            ],
            id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a',
            name: 'Test2',
            type: 'line',
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          data: [
            '09:42:00',
            '09:43:00',
            '09:44:00',
            '09:45:00',
            '09:46:00',
            '09:47:00',
            '09:48:00',
            '09:49:00',
            '09:50:00',
            '09:51:00',
            '09:52:00',
            '09:53:00',
            '09:54:00',
            '09:55:00',
            '09:56:00',
            '09:57:00',
            '09:58:00',
            '09:59:00',
            '10:00:00',
            '10:01:00',
          ],
          name: 'timestamp',
          type: 'category',
        },
        yAxis: [
          {
            id: 'b18dc7d6-5f11-4bce-b4d0-6640bbf6aeed',
            scale: true,
            type: 'value',
          },
          {
            id: '3785e66e-7d19-4e2b-b592-9da0eeafeb0a',
            scale: true,
            type: 'value',
          },
        ],
      });
    });
  });
});
