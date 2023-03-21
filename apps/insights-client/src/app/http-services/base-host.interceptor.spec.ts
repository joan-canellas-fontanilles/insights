import { TestBed } from '@angular/core/testing';

import { BaseHostInterceptor } from './base-host.interceptor';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('BaseHostInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        BaseHostInterceptor,
        { provide: 'BASE_API_URL', useValue: 'http://test-url/api/v1' },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: BaseHostInterceptor =
      TestBed.inject(BaseHostInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add the base url to the request', (done) => {
    const requestMock = new HttpRequest('GET', '/test');

    const next: HttpHandler = {
      handle: (
        request: HttpRequest<unknown>
      ): Observable<HttpEvent<unknown>> => {
        expect(request.url).toEqual('http://test-url/api/v1/test');
        return of(new HttpResponse());
      },
    };

    const interceptor: BaseHostInterceptor =
      TestBed.inject(BaseHostInterceptor);

    interceptor.intercept(requestMock, next).subscribe(() => done());
  });
});
