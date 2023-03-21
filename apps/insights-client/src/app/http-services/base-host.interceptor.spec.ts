import { TestBed } from '@angular/core/testing';

import { BaseHostInterceptor } from './base-host.interceptor';

describe('BaseHostInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BaseHostInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: BaseHostInterceptor =
      TestBed.inject(BaseHostInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
