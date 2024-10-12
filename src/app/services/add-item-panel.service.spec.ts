import { TestBed } from '@angular/core/testing';

import { AddItemPanelService } from './add-item-panel.service';

describe('AddItemPanelService', () => {
  let service: AddItemPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
