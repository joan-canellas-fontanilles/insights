import { TestBed } from '@angular/core/testing';

import { MetricHttpService } from './metric-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('MetricHttpService', () => {
  let service: MetricHttpService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MetricHttpService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get metric request', () => {
    it('should send the request to the correct url', async () => {
      const get = jest.spyOn(httpClient, 'get');

      await service.get('fdab30e8-f8e9-4d31-9350-e5b909d2925f');

      expect(get).toBeCalledWith(
        '/metric/fdab30e8-f8e9-4d31-9350-e5b909d2925f'
      );
    });
  });

  describe('get all metric request', () => {
    it('should send the request to the correct url', async () => {
      const get = jest.spyOn(httpClient, 'get');

      await service.getAll();

      expect(get).toBeCalledWith('/metric/');
    });
  });

  describe('create metric request', () => {
    it('should send the request to the correct url and body', async () => {
      const post = jest.spyOn(httpClient, 'post');

      await service.create({ name: 'test' });

      expect(post).toBeCalledWith('/metric', { name: 'test' });
    });
  });

  describe('update metric request', () => {
    it('should send the request to the correct url and body', async () => {
      const put = jest.spyOn(httpClient, 'put');

      await service.update('fdab30e8-f8e9-4d31-9350-e5b909d2925f', {
        name: 'test',
      });

      expect(put).toBeCalledWith(
        '/metric/fdab30e8-f8e9-4d31-9350-e5b909d2925f',
        { name: 'test' }
      );
    });
  });
});
