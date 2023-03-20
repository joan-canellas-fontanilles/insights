import {
  CreateMetricRequestUrl,
  GetAllMetricsRequestUrl,
  MetricResponse,
} from '@insights/insights-api-data';
import axios from 'axios';

describe('GET /metric/', () => {
  let createdMetricIds: string[];

  beforeAll(async () => {
    const request1 = await axios.post(CreateMetricRequestUrl, {
      name: 'get-all-1',
    });
    expect(request1.status).toBe(201);
    const request2 = await axios.post(CreateMetricRequestUrl, {
      name: 'get-all-2',
    });
    expect(request2.status).toBe(201);
    const request3 = await axios.post(CreateMetricRequestUrl, {
      name: 'get-all-3',
    });
    expect(request3.status).toBe(201);

    createdMetricIds = [request1.data.id, request2.data.id, request3.data.id];
  });

  it('response with 200 with the created metrics', async () => {
    const response = await axios.get(GetAllMetricsRequestUrl);
    const match = (id: string, name: string) => (metric: MetricResponse) =>
      metric.id === id && metric.name === name;

    expect(response.status).toBe(200);
    expect(
      response.data.find(match(createdMetricIds[0], 'get-all-1'))
    ).toBeDefined();

    expect(
      response.data.find(match(createdMetricIds[1], 'get-all-2'))
    ).toBeDefined();

    expect(
      response.data.find(match(createdMetricIds[2], 'get-all-3'))
    ).toBeDefined();
  });
});
