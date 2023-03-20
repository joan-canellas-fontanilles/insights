import { GenericRequest } from './generic-request';

export const GetAllMetricsRequestUrl = '/metric/';

export interface GetAllMetricsRequest extends GenericRequest {
  readonly url: typeof GetAllMetricsRequestUrl;
  readonly method: 'GET';
}
