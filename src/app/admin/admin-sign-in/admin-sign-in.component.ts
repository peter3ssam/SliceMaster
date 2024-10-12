import { AfterViewInit, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-sign-in',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.css',
})
export class AdminSignInComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (localStorage.getItem('accountAdmin')) {
      this.route.navigate(['admin', 'admin-orders']);
    }
  }
  signServ = inject(SignInService);
  route = inject(Router);
  submitAdminData(form) {
    this.signServ.sendDataToServer(form, false).subscribe((d: string) => {
      localStorage.setItem('account', d);
      this.route.navigate(['admin']);
    });
  }
}
