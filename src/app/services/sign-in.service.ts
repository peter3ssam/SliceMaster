import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  http = inject(HttpClient);
  user = new BehaviorSubject<null | string>(null);
  panelStatus = false;
  panelStatusSugj = new BehaviorSubject(this.panelStatus);
  changePanelStatues() {
    this.panelStatus = !this.panelStatus;
    this.panelStatusSugj.next(this.panelStatus);
  }
  sendDataToServer(data: User, isRegister: boolean) {
    if (isRegister) {
      return this.http.post(
        'https://localhost:44301/api/Account/Register',
        data
      );
    } else {
      return this.http.post('https://localhost:44301/api/Account/Login', data, {
        responseType: 'text',
      });
    }
  }
  autoLogein() {
    if (localStorage.getItem('account')) {
      this.user.next(localStorage.getItem('account'));
    }
  }
  route = inject(Router);
  logout() {
    this.user.next(null);
    localStorage.removeItem('account');
    this.route.navigate(['/']);
  }
}
