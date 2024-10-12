import { TestBed } from '@angular/core/testing';

import { GetOffersService } from './get-offers.service';

describe('GetOffersService', () => {
  let service: GetOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
