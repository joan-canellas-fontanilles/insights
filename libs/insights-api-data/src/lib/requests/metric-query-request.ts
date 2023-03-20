import { GenericRequest } from './generic-request';
import { MetricQuery } from '../query';

export const MetricQueryRequestUrl = '/metric-query';

interface MetricQueryRequestQuery {
  readonly query: MetricQuery;
}

export interface MetricQueryRequest extends GenericRequest {
  readonly url: typeof MetricQueryRequestUrl;
  readonly method: 'GET';
  readonly query: MetricQueryRequestQuery;
}
