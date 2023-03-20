import { GenericRequest } from './generic-request';

export const CreateMetricValueRequestUrl = '/metric/:metricId/value';

export interface CreateMetricValueRequestBody {
  readonly value: number;
  readonly timestamp: Date | null;
}

interface CreateMetricValueRequestQuery {
  readonly metricId: string;
}

export interface CreateMetricValueRequest extends GenericRequest {
  readonly url: typeof CreateMetricValueRequestUrl;
  readonly method: 'POST';
  readonly body: CreateMetricValueRequestBody;
  readonly query: CreateMetricValueRequestQuery;
}
