import { GenericRequest } from './generic-request';

interface GetMetricRequestQuery {
  readonly metricId: string;
}
export interface GetMetricRequest extends GenericRequest {
  readonly url: '/metric/:metricId';
  readonly method: 'GET';
  readonly query: GetMetricRequestQuery;
}
