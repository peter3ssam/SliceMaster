import { Injectable, inject } from '@angular/core';
import { item } from '../models/item.model';
import { offer } from '../models/offer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetOffersService {
  offers: offer[] = [];
  http = inject(HttpClient);
  getOffers() {
    return this.http.get('https://localhost:44301/api/ItemsAdmin/GetAllOffers');
  }
  getOffer(id: number) {
    return this.http.get(
      'https://localhost:44301/api/ItemsAdmin/GetOffer/' + id
    );
  }
  // https://localhost:44301/api/ItemsAdmin/GetOffer/
  addOffer(offer: offer) {
    this.offers.push(offer);
    this.http
      .post('https://localhost:44301/api/ItemsAdmin/AddOffer', offer)
      .subscribe((d) => {});
  }
  editOffer(offer: offer) {
    this.http
      .put('https://localhost:44301/api/ItemsAdmin/UpdateOffer', offer)
      .subscribe((d) => {});
  }
  removeOffer(id: number) {
    this.http
      .delete('https://localhost:44301/api/ItemsAdmin/DeleteOffer/' + id)
      .subscribe((d) => {
        this.getOffers();
      });
  }
}
