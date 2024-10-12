import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class AddItemPanelService {
  bool = false;
  panelStatues = new BehaviorSubject(this.bool);
  panelData = new BehaviorSubject<item | any>(new item('', '', 0, ''));
  addPanel: boolean | null = null;
  changePanelStatues(addPanel: boolean | null) {
    this.bool = !this.bool;
    this.panelStatues.next(this.bool);
  }
  changePanelType(isAddPanel: boolean) {
    this.addPanel = isAddPanel;
  }
  addPanelData(data: item, cat: string, index = null) {
    if (index) {
      this.panelData.next({ ...data, itemCat: cat, index: index });
    } else {
      this.panelData.next({...data,itemCat: cat});
    }
  }
}
