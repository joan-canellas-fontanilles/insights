import axios from 'axios';
import {
  CreateMetricRequestUrl,
  CreateMetricValueRequestUrl,
} from '@insights/insights-api-data';

describe('POST /metric/:metricId/value', () => {
  const route = (metricId: string) =>
    CreateMetricValueRequestUrl.replace(':metricId', metricId);
  let metricId: string;

  beforeAll(async () => {
    const response = await axios.post(CreateMetricRequestUrl, {
      name: 'for-metric-value',
    });

    expect(response.status).toBe(201);
    metricId = response.data.id;
  });

  it('returns a 201 if the metricValue is created successfully', async () => {
    const response = await axios.post(route(metricId), {
      value: 20,
    });
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.value).toEqual(20);
    expect(response.data.timestamp).toBeDefined();
    expect(response.data.metricId).toBe(metricId);
  });

  it('returns a 201 if the metricValue (with timestamp) is created successfully', async () => {
    const response = await axios.post(route(metricId), {
      value: 20,
      timestamp: new Date('2023-03-20'),
    });
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.value).toEqual(20);
    expect(response.data.timestamp).toEqual('2023-03-20T00:00:00.000Z');
    expect(response.data.metricId).toBe(metricId);
  });

  it('returns a 400 if value is not a in the body', async () => {
    const response = await axios.post(route(metricId), {});
    expect(response.status).toBe(400);
  });

  it('returns a 400 if value is not a number', async () => {
    const response = await axios.post(route(metricId), {
      value: 'value',
    });
    expect(response.status).toBe(400);
  });

  it('returns a 400 if timestamp is not a valid date', async () => {
    const response = await axios.post(route(metricId), {
      value: 20,
      timestamp: 'not-a-valid-date',
    });
    expect(response.status).toBe(400);
  });
});
