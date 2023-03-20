import { GenericRequest } from './generic-request';

export const CreateMetricRequestUrl = '/metric';

export interface CreateMetricRequestBody {
  readonly name: string;
}

export interface CreateMetricRequest extends GenericRequest {
  readonly url: typeof CreateMetricRequestUrl;
  readonly method: 'POST';
  readonly body: CreateMetricRequestBody;
}
