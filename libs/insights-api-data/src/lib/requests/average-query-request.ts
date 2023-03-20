import { GenericRequest } from './generic-request';
import { AverageQuery } from '../query';

export const AverageQueryRequestUrl = '/metric/:metricId/average?query=:query';

interface AverageQueryRequestQuery {
  readonly metricId: string;
  readonly query: AverageQuery;
}

export interface AverageQueryRequest extends GenericRequest {
  readonly url: typeof AverageQueryRequestUrl;
  readonly method: 'GET';
  readonly query: AverageQueryRequestQuery;
}
