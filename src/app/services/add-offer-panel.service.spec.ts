import { TestBed } from '@angular/core/testing';

import { AddOfferPanelService } from './add-offer-panel.service';

describe('AddOfferPanelService', () => {
  let service: AddOfferPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOfferPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
