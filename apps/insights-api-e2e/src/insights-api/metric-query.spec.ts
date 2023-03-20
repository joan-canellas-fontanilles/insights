import axios from 'axios';
import {
  AggregationType,
  CreateMetricRequestUrl,
  CreateMetricValueRequestUrl,
  MetricQuery,
  MetricQueryRequestUrl,
  TimePeriod,
} from '@insights/insights-api-data';

describe('GET /metric-query', () => {
  let metricIds: string[];

  const generateQuery = (group: TimePeriod) =>
    new MetricQuery({
      metricIds,
      group,
      timeFilter: {
        from: new Date('2023-03-20T00:00:00.000Z'),
        to: new Date('2023-03-21T02:00:00.000Z'),
      },
      aggregation: AggregationType.Average,
    });

  beforeAll(async () => {
    const responses = await Promise.all([
      axios.post(CreateMetricRequestUrl, { name: 'metric-query-1' }),
      axios.post(CreateMetricRequestUrl, { name: 'metric-query-2' }),
    ]);
    responses.forEach((response) => expect(response.status).toBe(201));
    metricIds = responses.map((response) => response.data.id);
  });

  beforeAll(async () => {
    const requests = metricIds.flatMap((metricId, indexMetric) => {
      const url = CreateMetricValueRequestUrl.replace(':metricId', metricId);
      const dates = [
        '2023-03-20T00:10:00Z',
        '2023-03-20T00:10:30Z',
        '2023-03-20T00:50:00Z',
        '2023-03-20T01:14:00Z',
        '2023-03-21T01:50:00Z',
      ];
      return dates.map((date, indexDate) =>
        axios.post(url, {
          value: 10 * (indexDate + 1) + 10 * indexMetric,
          timestamp: new Date(date),
        })
      );
    });
    const responses = await Promise.all(requests);
    responses.forEach((response) => expect(response.status).toBe(201));
  });

  it('response with 400 if no query parameter', async () => {
    const response = await axios.get(MetricQueryRequestUrl);
    expect(response.status).toBe(400);
  });

  it('response with 200 with the value of the query group by Day', async () => {
    const query = generateQuery(TimePeriod.Day);
    const response = await axios.get(
      MetricQueryRequestUrl + '?query=' + query.toString()
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
        metric: metricIds[0],
        data: [
          { time: '2023-03-20T00:00:00.000Z', value: 25 },
          { time: '2023-03-21T00:00:00.000Z', value: 50 },
        ],
      },
      {
        metric: metricIds[1],
        data: [
          { time: '2023-03-20T00:00:00.000Z', value: 35 },
          { time: '2023-03-21T00:00:00.000Z', value: 60 },
        ],
      },
    ]);
  });

  it('response with 200 with the value of the query group by Hour', async () => {
    const query = generateQuery(TimePeriod.Hour);
    const response = await axios.get(
      MetricQueryRequestUrl + '?query=' + query.toString()
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
        metric: metricIds[0],
        data: [
          { time: '2023-03-20T00:00:00.000Z', value: 20 },
          { time: '2023-03-20T01:00:00.000Z', value: 40 },
          { time: '2023-03-21T01:00:00.000Z', value: 50 },
        ],
      },
      {
        metric: metricIds[1],
        data: [
          { time: '2023-03-20T00:00:00.000Z', value: 30 },
          { time: '2023-03-20T01:00:00.000Z', value: 50 },
          { time: '2023-03-21T01:00:00.000Z', value: 60 },
        ],
      },
    ]);
  });

  it('response with 200 with the value of the query group by Minute', async () => {
    const query = generateQuery(TimePeriod.Minute);
    const response = await axios.get(
      MetricQueryRequestUrl + '?query=' + query.toString()
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
        metric: metricIds[0],
        data: [
          { time: '2023-03-20T00:10:00.000Z', value: 15 },
          { time: '2023-03-20T00:50:00.000Z', value: 30 },
          { time: '2023-03-20T01:14:00.000Z', value: 40 },
          { time: '2023-03-21T01:50:00.000Z', value: 50 },
        ],
      },
      {
        metric: metricIds[1],
        data: [
          { time: '2023-03-20T00:10:00.000Z', value: 25 },
          { time: '2023-03-20T00:50:00.000Z', value: 40 },
          { time: '2023-03-20T01:14:00.000Z', value: 50 },
          { time: '2023-03-21T01:50:00.000Z', value: 60 },
        ],
      },
    ]);
  });
});
