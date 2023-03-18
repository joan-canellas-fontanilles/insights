import { GenericRequest } from './generic-request';
import { AverageQuery } from '../query';

interface AverageQueryRequestQuery {
  readonly metricId: string;
  readonly query: AverageQuery;
}

export interface AverageQueryRequest extends GenericRequest {
  readonly url: '/metric/:metricId/average?query=:query';
  readonly method: 'GET';
  readonly query: AverageQueryRequestQuery;
}
