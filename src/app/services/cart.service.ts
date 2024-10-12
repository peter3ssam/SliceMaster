import { Injectable, inject } from '@angular/core';
import { item } from '../models/item.model';
import { offer } from '../models/offer.model';
import { Order } from '../models/order.model';
import { OrdersService } from './orders.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckOutService } from './check-out.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cart: Order | null = null;
  cartSubj = new BehaviorSubject(this.cart);
  orders = inject(OrdersService);
  checkOutServ = inject(CheckOutService);
  http = inject(HttpClient);
  addToCart(product: item | offer, isItem: boolean = true) {
    this.checkOutServ.isCheckedOut().subscribe((d) => {
      if (!d) {
        if (this.orders.orders.length) {
          if (this.orders.orders[0]['order'].orderStatus === 'suc') {
            this.orders.orders = null;
          }
        }
        if (this.cart) {
          this.cart.cart.push(product);
        } else {
          this.cart = new Order([product]);
        }
        this.cartSubj.next(this.cart);
        if (isItem) {
          this.http
            .post(
              'https://localhost:44301/api/ItemsUser/AddItemToCart',
              product,
              {
                responseType: 'text',
              }
            )
            .subscribe((d) => {});
        } else {
          console.log(
            new offer(
              product.name,
              product.imgSrc,
              product.price,
              product['offerLink'],
              1,
              product['items'],
              product.id
            )
          );
          /*      new offer(
            product.name,
            product.imgSrc,
            product.price,
            product['offerLink'],
            1,
            product['items'],
            product.id
          ), */

          this.http
            .post(
              'https://localhost:44301/api/ItemsUser/AddOfferToCart',
              // { ...product, Item: product['items'] },
              product,
              {
                responseType: 'text',
              }
            )
            .subscribe((d) => {
              console.log(d);
            });
        }
        return true;
      }
      return false;
    });
  }
  // calcTotal() {
  //   let total = 0;
  //   this.cart?.cart?.forEach((d) => {
  //     total = total + d.price * d.quantity;
  //   });
  //   this.cart.total = total;
  // }
  deleteFromCart(index: number) {
    this.cart.cart.splice(index, 1);
    // this.calcTotal();
  }
  increaseQuantity(index: number) {
    this.cart.cart[index].quantity++;
  }
  decreaseQuantity(index: number) {
    this.cart.cart[index].quantity--;
  }
  clearCart() {
    this.cart = null;
  }
  getCartItems() {
    return this.http.get('https://localhost:44301/api/ItemsUser/GetCartItems');
  }
  removeItemFromCart(item: item) {
    return this.http.post(
      'https://localhost:44301/api/ItemsUser/DeleteItemFromCart',
      item,
      { responseType: 'text' }
    );
  }
  removeOfferFromCart(offer: offer) {
    return this.http.post(
      'https://localhost:44301/api/ItemsUser/DeleteOfferFromCart',
      offer,
      { responseType: 'text' }
    );
  }
  getCartOffers() {
    return this.http.get('https://localhost:44301/api/ItemsUser/GetCartOffers');
  }
  getOrder() {
    return this.http.get('https://localhost:44301/api/ItemsUser/GetUserOrder');
  }
}
