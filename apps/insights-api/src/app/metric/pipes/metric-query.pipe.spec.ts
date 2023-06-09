import { MetricQueryPipe } from './metric-query.pipe';
import { MetricQueryData, TimePeriod } from '@insights/insights-api-data';
import { AggregationType } from '@insights/insights-api-data';
import { BadRequestException } from '@nestjs/common';

describe('MetricQueryPipe', () => {
  const pipe = new MetricQueryPipe();
  const metricQueryData: MetricQueryData = {
    metricIds: [
      '5586acf5-fdfa-4a58-b4b4-9bfa7ef45c2d',
      'b8ce30b1-a4e4-48a4-81fb-997c28cacb2b',
    ],
    group: TimePeriod.Hour,
    aggregation: AggregationType.Average,
    timeFilter: {
      from: new Date('2023-03-18T10:00:00.000Z'),
      to: new Date('2023-03-18T12:00:00.000Z'),
    },
  };

  const metricQueryDataBase64 =
    'eyJtZXRyaWNJZHMiOlsiNTU4NmFjZjUtZmRmYS00YTU4LWI0YjQtOWJmYTdlZjQ1YzJkIiwiYjhjZ' +
    'TMwYjEtYTRlNC00OGE0LTgxZmItOTk3YzI4Y2FjYjJiIl0sImdyb3VwIjoiaG91ciIsInRpbWVGaW' +
    'x0ZXIiOnsiZnJvbSI6IjIwMjMtMDMtMThUMTA6MDA6MDAuMDAwWiIsInRvIjoiMjAyMy0wMy0xOFQ' +
    'xMjowMDowMC4wMDBaIn19';

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should throw a BadRequestException if no query is provided', () => {
    expect(() => pipe.transform(null, null)).toThrowError(BadRequestException);
  });

  it('should be able to instantiate a MetricQuery', () => {
    const instance = pipe.transform(metricQueryDataBase64, null);
    expect(instance).toEqual(metricQueryData);
  });
});
