import { TestBed } from '@angular/core/testing';

import { MetricValueHttpService } from './metric-value-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('MetricValueHttpService', () => {
  let service: MetricValueHttpService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MetricValueHttpService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the request to the correct url and body', async () => {
    const post = jest.spyOn(httpClient, 'post');

    await service.create('fdab30e8-f8e9-4d31-9350-e5b909d2925f', {
      value: 10,
      timestamp: null,
    });

    expect(post).toBeCalledWith(
      '/metric/fdab30e8-f8e9-4d31-9350-e5b909d2925f/value',
      { value: 10, timestamp: null }
    );
  });
});
