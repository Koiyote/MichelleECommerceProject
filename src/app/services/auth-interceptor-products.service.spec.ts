import { TestBed } from '@angular/core/testing';

import { AuthInterceptorProductsService } from './auth-interceptor-products.service';

describe('AuthInterceptorProductsService', () => {
  let service: AuthInterceptorProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
