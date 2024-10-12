import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { checkOut } from '../models/checkOut.model';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  http = inject(HttpClient);
  checkOut(check: checkOut) {
    var token = localStorage.getItem('account');
    var headers = { Authorization: `Bearer ${token}` };
    return this.http.post(
      'https://localhost:44301/api/ItemsUser/Checkout',
      check,
      { responseType: 'text' }
    );
  }
  isCheckedOut() {
    return this.http.get('https://localhost:44301/api/ItemsUser/IsCheckedout');
  }
}
