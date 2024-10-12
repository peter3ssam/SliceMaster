import { TestBed } from '@angular/core/testing';

import { AuthInterCeptorService } from './auth-inter-ceptor.service';

describe('InterCeptorService', () => {
  let service: AuthInterCeptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterCeptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
