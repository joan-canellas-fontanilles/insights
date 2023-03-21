import axios from 'axios';
import {
  CreateMetricRequestUrl,
  UpdateMetricRequestUrl,
} from '@insights/insights-api-data';

describe('PUT /metric/:metricId', () => {
  const route = (id: string) => UpdateMetricRequestUrl.replace(':metricId', id);
  let createdMetricId: string;

  beforeAll(async () => {
    const response = await axios.post(CreateMetricRequestUrl, {
      name: 'to-update',
    });
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.name).toEqual('to-update');
    createdMetricId = response.data.id;
  });

  it('returns a 200 if the metric is updated successfully', async () => {
    const response = await axios.put(route(createdMetricId), {
      name: 'updated',
    });
    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined();
    expect(response.data.name).toEqual('updated');
  });

  it('returns a 404 if metric does not exist', async () => {
    const response = await axios.put(
      route('2c111e18-daf6-4153-a9ca-971c4805bd90'),
      { name: 'updated' }
    );
    expect(response.status).toBe(404);
  });

  it('returns a 400 if a metric with the same name exists', async () => {
    const duplicatedName = await axios.post(CreateMetricRequestUrl, {
      name: 'duplicated-name',
    });
    expect(duplicatedName.status).toBe(201);

    const response = await axios.put(
      route('2c111e18-daf6-4153-a9ca-971c4805bd90'),
      { name: 'duplicated-name' }
    );
    expect(response.status).toBe(404);
  });

  it('returns a 400 if name is shorted than 4 characters', async () => {
    const response = await axios.put(route(createdMetricId), { name: 'tes' });
    expect(response.status).toBe(400);
  });

  it('returns a 400 if name is longer than 20 characters', async () => {
    const response = await axios.put(route(createdMetricId), {
      name: 'test with a longer name',
    });
    expect(response.status).toBe(400);
  });
});
