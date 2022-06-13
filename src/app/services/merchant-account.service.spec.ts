import { TestBed } from '@angular/core/testing';

import { MerchantAccountService } from './merchant-account.service';

describe('MerchantAccountService', () => {
  let service: MerchantAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
