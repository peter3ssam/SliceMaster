import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OrdersService } from './services/orders.service';
import { GetItemsService } from './services/get-items.service';
import { ContactService } from './services/contact.service';
import { CartService } from './services/cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckOutService } from './services/check-out.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HttpClientModule],
  providers: [
    GetItemsService,
    ContactService,
    CartService,
    HttpClient,
    CheckOutService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SliceMaster';
}
