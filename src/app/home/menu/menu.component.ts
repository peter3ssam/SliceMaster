import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { RouterOutlet } from '@angular/router';
import { OffersComponent } from './offers/offers.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ItemComponent,RouterOutlet,OffersComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
