import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemPanelComponent } from './add-item-panel.component';

describe('AddItemPanelComponent', () => {
  let component: AddItemPanelComponent;
  let fixture: ComponentFixture<AddItemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
