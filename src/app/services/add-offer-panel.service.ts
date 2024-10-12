import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { offer } from '../models/offer.model';
@Injectable({
  providedIn: 'root',
})
export class AddOfferPanelService {
  bool = false;
  panelStatues = new BehaviorSubject(this.bool);
  panelData = new BehaviorSubject<offer | any>({ name: '', price: 0, imgSrc: '' });
  addPanel: boolean | null = null;
  changePanelStatues(addPanel: boolean | null) {
    this.panelData.subscribe((d) => {
    });
    this.bool = !this.bool;
    this.panelStatues.next(this.bool);
  }
  changePanelType(isAddPanel: boolean) {
    this.addPanel = isAddPanel;
  }
  addPanelData(data: offer|any, index = null) {
    if (index) {
      this.panelData.next({ ...data, index: index });
    } else {
      this.panelData.next({ ...data });
    }
  }
}
