import { GenericRequest } from './generic-request';

interface CreateMetricRequestBody {
  readonly name: string;
}

export interface CreateMetricRequest extends GenericRequest {
  readonly url: '/metric';
  readonly method: 'POST';
  readonly body: CreateMetricRequestBody;
}
