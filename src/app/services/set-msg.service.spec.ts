import { TestBed } from '@angular/core/testing';

import { SetMsgService } from './set-msg.service';

describe('SetErrorMsgService', () => {
  let service: SetMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
