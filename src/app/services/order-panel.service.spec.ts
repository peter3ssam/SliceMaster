import { TestBed } from '@angular/core/testing';

import { OrderPanelService } from './order-panel.service';

describe('OrderPanelService', () => {
  let service: OrderPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
