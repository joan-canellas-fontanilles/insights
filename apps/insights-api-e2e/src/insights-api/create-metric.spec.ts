import axios from 'axios';
import { CreateMetricRequestUrl } from '@insights/insights-api-data';

describe('POST /metric', () => {
  it('returns a 201 if the metric is created correctly', async () => {
    const response = await axios.post(CreateMetricRequestUrl, {
      name: 'created',
    });
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.name).toEqual('created');
  });

  it('returns a 400 if name is shorted than 4 characters', async () => {
    const response = await axios.post(CreateMetricRequestUrl, { name: 'tes' });
    expect(response.status).toBe(400);
  });

  it('returns a 400 if name is longer than 20 characters', async () => {
    const response = await axios.post(CreateMetricRequestUrl, {
      name: 'test with a longer name',
    });
    expect(response.status).toBe(400);
  });

  it('returns a 400 if the name is already in use', async () => {
    await axios.post(CreateMetricRequestUrl, { name: 'in-use' });
    const response = await axios.post(CreateMetricRequestUrl, {
      name: 'in-use',
    });
    expect(response.status).toBe(400);
  });
});
