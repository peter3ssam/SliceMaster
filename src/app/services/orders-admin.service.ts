import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersAdminService {
  constructor(private http: HttpClient) {}

  // http = inject(HttpClient);
  getAllOrders() {
    return this.http.get('https://localhost:44301/api/ItemsAdmin/GetAllOrders');
  }
  updateOrderStatues(order: Order) {
    return this.http.put(
      'https://localhost:44301/api/ItemsAdmin/UpdateOrderStatues',
      order,
      { responseType: 'text' }
    );
  }
}
