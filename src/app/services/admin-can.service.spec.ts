import { TestBed } from '@angular/core/testing';

import { AdminCanService } from './admin-can.service';

describe('AdminCanService', () => {
  let service: AdminCanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
