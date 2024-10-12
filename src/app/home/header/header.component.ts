import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private signServ: SignInService, private router: Router) {}
  ngOnInit(): void {
    this.signServ.user.subscribe((d) => {
      this.user = d;
    });
  }
  signIn() {
    this.signServ.changePanelStatues();
  }
  logout() {
    this.signServ.logout();
  }
  user: string | null = null;
  cart() {
    this.router.navigate(['cart']);
  }
}
