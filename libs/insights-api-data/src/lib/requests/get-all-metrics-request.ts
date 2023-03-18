import { GenericRequest } from './generic-request';

export interface GetAllMetricsRequest extends GenericRequest {
  readonly url: '/metric/';
  readonly method: 'GET';
}
