import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferPanelComponent } from './add-offer-panel.component';

describe('AddOfferPanelComponent', () => {
  let component: AddOfferPanelComponent;
  let fixture: ComponentFixture<AddOfferPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfferPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfferPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
