import { GenericRequest } from './generic-request';

interface CreateMetricValueRequestBody {
  readonly value: number;
  readonly timestamp: Date | null;
}

interface CreateMetricValueRequestQuery {
  readonly metricId: string;
}

export interface CreateMetricValueRequest extends GenericRequest {
  readonly url: '/metric/:metricId/value';
  readonly method: 'POST';
  readonly body: CreateMetricValueRequestBody;
  readonly query: CreateMetricValueRequestQuery;
}
