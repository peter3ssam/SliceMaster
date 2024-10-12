import { Injectable, inject } from '@angular/core';
import { Order } from '../models/order.model';
import { item } from '../models/item.model';
import { offer } from '../models/offer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: Order[] = [];
  http = inject(HttpClient);
  getOrder() {
    // var header: HttpHeaders = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('account')}`,
    // });
    return this.http.get('https://localhost:44301/api/ItemsAdmin/GetAllOrders');
    // {
    //   headers: header,
    // }
  }
  addOrder(order: Order) {
    this.orders.push(order);
  }
  removeOrder(index: number) {
    // this.items[cat].splice(index,1)
    this.orders[1];
  }
}
