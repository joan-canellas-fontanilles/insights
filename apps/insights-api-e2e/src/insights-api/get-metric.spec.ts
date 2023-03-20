import axios from 'axios';
import {
  CreateMetricRequestUrl,
  GetMetricRequestUrl,
} from '@insights/insights-api-data';

describe('GET /metric/:metricId', () => {
  const route = (id: string) => GetMetricRequestUrl.replace(':metricId', id);
  let createdMetricId: string;

  beforeAll(async () => {
    const request = await axios.post(CreateMetricRequestUrl, {
      name: 'test',
    });
    expect(request.status).toBe(201);
    createdMetricId = request.data.id;
  });

  it('response with 200 if the metric is returned successfully', async () => {
    const response = await axios.get(route(createdMetricId));
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: createdMetricId, name: 'test' });
  });

  it('response with 400 if no valid id is provided', async () => {
    const response = await axios.get(route('not-valid-uuid'));
    expect(response.status).toBe(400);
  });

  it('response with 404 if not metric is found with the provided id', async () => {
    const response = await axios.get(
      route('603f8acf-72c7-47d2-8126-9906a558f72e')
    );
    expect(response.status).toBe(404);
  });
});
