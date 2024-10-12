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
import { GetOffersService } from '../../../services/get-offers.service';
import { offer } from '../../../models/offer.model';
import { OrdersService } from '../../../services/orders.service';
import { CheckOutService } from '../../../services/check-out.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, ErrorComponent, SucceedComponent],
  providers: [ErrorComponent, SucceedComponent,GetOffersService],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  constructor(
    private link: ActivatedRoute,
    private router: Router,
    private getItem: GetItemsService
  ) {}
  ngOnInit(): void {
    this.link.params.subscribe((d) => {
      let link2 = d['id'];
      this.offersServ.getOffer(link2).subscribe((d: any) => {
        if (d) {
          this.getItems.getItems().subscribe((d: item[]) => {
            this.items = this.getItems.itemsDistrub(d);
          });
          this.offer = d;
        } else {
          this.router.navigate(['not-found']);
        }
      });
    });
    this.signServ.user.subscribe((d) => {
      this.user = d;
    });
  }
  offer: offer;
  items: any = [];

  user: string | null = null;
  signServ = inject(SignInService);
  getItems = inject(GetItemsService);
  msgServ = inject(SetMsgService);
  cartServ = inject(CartService);
  checkServ = inject(CheckOutService);
  offersServ = inject(GetOffersService);
  msgType: string | null = null;

  orders = inject(OrdersService);
  async addToCart() {
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
    await this.checkServ.isCheckedOut().subscribe((d) => {
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
      this.cartServ.addToCart(this.offer, false);

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
