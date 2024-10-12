import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  ChangeDetectorRef,
} from '@angular/core';

import { CartService } from '../../services/cart.service';
import { item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { SignInService } from '../../services/sign-in.service';
import { offer } from '../../models/offer.model';
import { FormsModule } from '@angular/forms';
import { CheckComponent } from '../../dynamiComponents/check/check.component';
import { CheckService } from '../../services/check.service';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckComponent],
  providers: [CheckOutService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartServ = inject(CartService);
  signServ = inject(SignInService);
  checkOutServ = inject(CheckOutService);
  orderServ = inject(OrdersService);
  cart: (item | offer)[] = [];
  OrderData: Order;
  user: string | null = null;
  test: any;
  isChechedout: boolean = true;
  nameOFirstItem;
  ngOnInit(): void {
    this.fetchNeededData();
  }
  fetchNeededData() {
    this.orderServ.getOrder().subscribe((d: any) => {
      this.OrderData = d;
    });
    this.checkOutServ.isCheckedOut().subscribe((d: boolean) => {
      this.isChechedout = d;
    });
    this.signServ.user.subscribe((d) => {
      this.user = d;
    });
    this.cartServ.cartSubj.subscribe((d) => {
      this.OrderData = d;
    });
    this.calcTotal();
    this.cartServ.getOrder().subscribe((d: Order) => {
      this.OrderData = d;
    });
    this.cartServ.getCartItems().subscribe((d: any) => {
      for (let i = 0; i < d.length; i++) {
        let ite = new item(
          d.name,
          d.decription,
          d.price,
          d.imgSrc,
          1,
          d.category,
          d.id,
          d.offerId
        );
        this.cart.push(d[i]);
      }
    });
    this.cartServ.getCartOffers().subscribe((d: any) => {
      for (let i = 0; i < d.length; i++) {
        this.cart.push(d[i]);
      }
    });
  }
  plus(index: any) {
    this.cartServ.increaseQuantity(index);
    this.calcTotal();
  }
  minus(index: any) {
    this.cartServ.decreaseQuantity(index);
    if (this.cartServ.cart.cart[index].quantity <= 0) {
      this.remove(index);
    }
    this.calcTotal();
  }
  remove(ite: item | offer) {
    if (ite['category']) {
      this.cartServ
        .removeItemFromCart(
          new item(
            ite.name,
            ite['decritption'],
            ite.price,
            ite.imgSrc,
            1,
            ite['category'],
            ite.id,
            ite['offerId']
          )
        )
        .subscribe((d) => {
          this.fetchNeededData();
          this.cartServ.getCartItems().subscribe((d: any) => {
            this.cart = d;
          });
        });
    } else {
      this.cartServ
        .removeOfferFromCart(
          new offer(
            ite.name,
            ite.imgSrc,
            ite.price,
            ite['offerLinke'],
            1,
            ite['item'],
            ite.id
          )
        )
        .subscribe((d) => {
          this.fetchNeededData();
        });
    }
  }
  total: number;
  calcTotal() {
    if (this.cartServ.cart) {
      // this.cartServ.calcTotal();
      this.total = this.cartServ.cart.total;
    }
  }
  checkOutBtn = false;
  check = inject(CheckService);
  orders = inject(OrdersService);
  makeTheOrder() {
    this.checkOutBtn = !this.checkOutBtn;
  }
  checkOut(data: any) {
    if (this.checkOutBtn && data) {
      if (!this.showCheck || !this.check.checkState) {
        this.showCheck = true;
        this.check.setMsg(
          'If You Sure To Do This Order Click On checkOut Again'
        );
      }

      if (this.check.checkState) {
        this.checkOutServ.checkOut(data).subscribe((d) => {});
        this.isChechedout = !this.isChechedout;
        // let d = { ...data, order: this.OrderData, total: this.total };
        // if (!this.orders.orders) {
        //   this.orders.orders = [d];
        // } else {
        //   this.orders.addOrder(d);
        // }

        this.check.setMsg('');
        this.check.checkState = false;
        // this.cart.cart.cart.splice(0, this.cart.cart.cart.length);
        // this.cart.cart.total = 0;
      }
    }
  }
  showCheck: boolean = false;
}
