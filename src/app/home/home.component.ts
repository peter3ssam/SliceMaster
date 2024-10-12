import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { SignInComponent } from '../dynamiComponents/sign-in/sign-in.component';
import { SignInService } from '../services/sign-in.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { GetOffersService } from '../services/get-offers.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ImageSliderComponent,
    RouterOutlet,
    AboutComponent,
    MenuComponent,
    SignInComponent,
    CommonModule
  ],
  providers: [SignInService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  signInPanelStatus = false;
  getOffers = inject(GetOffersService)
  constructor(private signServ: SignInService) {}
  ngOnInit(): void {
    this.signServ.autoLogein()
    this.signServ.panelStatusSugj.subscribe((d) => {
      this.signInPanelStatus = d;
    });
    this.getOffers.getOffers()
  }
}
