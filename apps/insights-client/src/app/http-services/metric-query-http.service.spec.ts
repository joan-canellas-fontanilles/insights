import { TestBed } from '@angular/core/testing';

import { MetricQueryHttpService } from './metric-query-http.service';
import { AggregationType, TimePeriod } from '@insights/insights-api-data';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('MetricQueryHttpService', () => {
  let service: MetricQueryHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MetricQueryHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the request to the correct url and body', (done) => {
    const request = service.query({
      metricIds: ['fdab30e8-f8e9-4d31-9350-e5b909d2925f'],
      group: TimePeriod.Day,
      timeFilter: {
        from: new Date('2023-03-21T10:40:00.000Z'),
        to: new Date('2023-03-21T10:50:00.000Z'),
      },
      aggregation: AggregationType.Average,
    });

    request.subscribe(() => {
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('query')).toEqual(
        'eyJtZXRyaWNJZHMiOlsiZmRhYjMwZTgtZjhlOS00ZDMxLTkzNTAtZTViOTA5ZDI5MjVmIl0sImdyb3VwIjoiRGF5IiwidGltZUZpbHRlciI6eyJmcm9tIjoiMjAyMy0wMy0yMVQxMDo0MDowMC4wMDBaIiwidG8iOiIyMDIzLTAzLTIxVDEwOjUwOjAwLjAwMFoifX0='
      );
      expect(req.request.url).toBe(`/metric-query`);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
    });

    req.flush({});
  });
});
