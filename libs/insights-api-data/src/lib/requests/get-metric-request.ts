import { GenericRequest } from './generic-request';

export const GetMetricRequestUrl = '/metric/:metricId';

interface GetMetricRequestQuery {
  readonly metricId: string;
}
export interface GetMetricRequest extends GenericRequest {
  readonly url: typeof GetMetricRequestUrl;
  readonly method: 'GET';
  readonly query: GetMetricRequestQuery;
}
