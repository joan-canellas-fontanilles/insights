import { GenericRequest } from './generic-request';

export const UpdateMetricRequestUrl = '/metric/:metricId';

export interface UpdateMetricRequestBody {
  readonly name: string;
}

interface UpdateMetricRequestQuery {
  readonly metricId: string;
}

export interface UpdateMetricRequest extends GenericRequest {
  readonly url: typeof UpdateMetricRequestUrl;
  readonly method: 'PUT';
  readonly body: UpdateMetricRequestBody;
  readonly query: UpdateMetricRequestQuery;
}
