import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetItemsService } from '../../../services/get-items.service';
import { item } from '../../../models/item.model';
import { User } from '../../../models/user.model';
import { SignInService } from '../../../services/sign-in.service';
import { ErrorComponent } from '../../../dynamiComponents/error/error.component';
import { SetMsgService } from '../../../services/set-msg.service';
import { SucceedComponent } from '../../../dynamiComponents/succeed/succeed.component';
import { CartService } from '../../../services/cart.service';
import { OrdersService } from '../../../services/orders.service';
import { CheckOutService } from '../../../services/check-out.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, ErrorComponent, SucceedComponent],
  providers: [ErrorComponent, SucceedComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  constructor(
    private link: ActivatedRoute,
    private router: Router,
    private getItem: GetItemsService,
    private checkServ: CheckOutService
  ) {}

  getItems = inject(GetItemsService);

  getItemAtCat(cat: string) {
    this.getItem.getItems().subscribe((d: item[]) => {
      this.items = this.getItems.itemsDistrub(d)[cat];
    });
  }
  ngOnInit(): void {
    this.link.params.subscribe((d) => {
      switch (d['id']) {
        case 'pizzas':
          this.getItemAtCat('pizza');

          break;
        case 'sides':
          this.getItemAtCat('sides');
          break;
        case 'drinks':
          this.getItemAtCat('drinks');
          break;
        case 'deserts':
          this.getItemAtCat('deserts');

          break;
        case 'extras':
          this.getItemAtCat('extras');
          break;
        default:
          this.router.navigate(['not-found']);

          break;
      }
    });
    this.signServ.user.subscribe((d) => {
      this.user = d;
    });
  }
  items?: item[];
  user: string | null = null;
  signServ = inject(SignInService);
  msgServ = inject(SetMsgService);
  cartServ = inject(CartService);
  msgType: string | null = null;
  orders = inject(OrdersService);
  addToCart(item: item) {
    if (this.orders.orders[0]) {
      if (this.orders.orders[0]['order'].orderStatus !== 'suc') {
        this.msgServ.setMsg("u can't add order till this order finished");
        this.msgType = 'error';
        setTimeout(() => {
          this.msgServ.setMsg('');
        }, 1500);
        return;
      } else if (this.orders.orders[0]['order'].orderStatus === 'suc') {
        this.orders.orders = [];
        this.cartServ.clearCart();
      }
    }
    this.checkServ.isCheckedOut().subscribe((d) => {
      if (d) {
        this.msgServ.setMsg("u can't add order till this order finished");
        this.msgType = 'error';
        setTimeout(() => {
          this.msgServ.setMsg('');
        }, 2000);
        return;
      }
    });
    if (this.user) {
      this.msgServ.setMsg('added to your cart succeded');
      this.msgType = 'suc';
      this.cartServ.addToCart(item);
      // this.cartServ.calcTotal();
      setTimeout(() => {
        this.msgServ.setMsg('');
      }, 1500);
    } else {
      this.msgServ.setMsg('login in to can add items to your cart');
      this.msgType = 'error';
      setTimeout(() => {
        this.msgServ.setMsg('');
      }, 1500);
    }
  }
}
