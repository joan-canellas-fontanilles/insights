import { GenericRequest } from './generic-request';

interface UpdateMetricRequestBody {
  readonly name: string;
}

interface UpdateMetricRequestQuery {
  readonly metricId: string;
}

export interface UpdateMetricRequest extends GenericRequest {
  readonly url: '/metric/:metricId';
  readonly method: 'PUT';
  readonly body: UpdateMetricRequestBody;
  readonly query: UpdateMetricRequestQuery;
}
