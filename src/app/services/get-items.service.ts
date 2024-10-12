import { Injectable, inject } from '@angular/core';
import { item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetItemsService {
  items = {
    pizza: [],
    sides: [],
    drinks: [],
    deserts: [],
    extras: [],
  };
  http = inject(HttpClient);
  getItems() {
    return this.http.get('https://localhost:44301/api/ItemsAdmin/GetAllItems');
  }
  itemsDistrub(items: item[]) {
    this.items = {
      pizza: [],
      sides: [],
      drinks: [],
      deserts: [],
      extras: [],
    };
    items.forEach((d) => {
      if (d.category === 'pizza') {
        this.items.pizza.push(d);
      }
      if (d.category === 'sides') {
        this.items.sides.push(d);
      }
      if (d.category === 'drinks') {
        this.items.drinks.push(d);
      }
      if (d.category === 'deserts') {
        this.items.deserts.push(d);
      }
      if (d.category === 'extras') {
        this.items.extras.push(d);
      }
    });
    return this.items;
  }
  addItem(item: item, cat: string) {
    item.category = cat;
    this.items[cat].push(item);
    this.http
      .post('https://localhost:44301/api/ItemsAdmin/AddItem', item)
      .subscribe((d) => {
        this.getItems().subscribe((d: item[]) => {
          this.itemsDistrub(d);
          console.log(d);
        });
      });
  }
  editItem(item: item, cat: string, id: number) {
    // this.items[cat][id] = item;

    this.http
      .put('https://localhost:44301/api/ItemsAdmin/UpdateItem/' + item.id, item)
      .subscribe((d) => {
        this.getItems().subscribe((d: item[]) => {
          this.itemsDistrub(d);
        });
      });
  }
  removeItem(item: item, index: number) {
    this.items[item.category].splice(index, 1);
    this.http
      .delete('https://localhost:44301/api/ItemsAdmin/DeleteItem/' + item.id)
      .subscribe((d) => {});
  }
}
