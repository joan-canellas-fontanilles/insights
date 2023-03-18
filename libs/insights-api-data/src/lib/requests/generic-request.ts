export interface GenericRequest {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT';
  readonly body: unknown;
  readonly query: unknown;
}
