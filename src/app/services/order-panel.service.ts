import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderPanelService {
  order: Order = null;

  currentOrder = new BehaviorSubject<Order | null>(null);
  setCurrentOrder(order: Order) {
    this.currentOrder.next(order)
  }
  bool = false;
  panelOpen = new BehaviorSubject(this.bool);
  changePanelStatues() {
    this.bool = !this.bool;
    this.panelOpen.next(this.bool);
  }
}
