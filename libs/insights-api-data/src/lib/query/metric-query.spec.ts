import { MetricQueryData } from './metric-query-data';
import { TimePeriod } from './time-period';
import { MetricQuery } from './metric-query';
import { AggregationType } from './aggregation-type';

describe('MetricQuery', () => {
  const metricQueryData: MetricQueryData = {
    metricIds: [
      '5586acf5-fdfa-4a58-b4b4-9bfa7ef45c2d',
      'b8ce30b1-a4e4-48a4-81fb-997c28cacb2b',
    ],
    group: TimePeriod.Hour,
    aggregation: AggregationType.Average,
    timeFilter: {
      from: new Date(2023, 2, 18, 10),
      to: new Date(2023, 2, 18, 12),
    },
  };

  const metricQueryDataBase64 =
    'eyJtZXRyaWNJZHMiOlsiNTU4NmFjZjUtZmRmYS00YTU4LWI0YjQtOWJmYTdlZjQ1YzJkIiwiYjhjZTMwYjEtYTRlNC00OGE0LTgxZmItOTk3YzI4Y2FjYjJiIl0sImdyb3VwIjoiSG91ciIsInRpbWVGaWx0ZXIiOnsiZnJvbSI6IjIwMjMtMDMtMThUMDk6MDA6MDAuMDAwWiIsInRvIjoiMjAyMy0wMy0xOFQxMTowMDowMC4wMDBaIn19';

  it('should be able to instantiate a MetricQuery', () => {
    const instance = new MetricQuery(metricQueryData);
    expect(instance).toBeTruthy();
  });

  it('should transform to base64 on toString call', () => {
    const instance = new MetricQuery(metricQueryData);
    const base64 = instance.toString();
    expect(base64).toEqual(metricQueryDataBase64);
  });

  it('should transform from base64 to MetricQuery on fromBase64 call', () => {
    const base64 = MetricQuery.fromString(metricQueryDataBase64);
    expect(base64).toEqual(new MetricQuery(metricQueryData));
  });
});
