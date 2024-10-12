import { Component, OnInit, inject } from '@angular/core';
import { GetItemsService } from '../../../services/get-items.service';
import { item } from '../../../models/item.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AddItemPanelComponent } from '../../../dynamiComponents/add-item-panel/add-item-panel.component';
import { CommonModule } from '@angular/common';
import { AddItemPanelService } from '../../../services/add-item-panel.service';
import { AdminCanService } from '../../../services/admin-can.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AddItemPanelComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  getItems = inject(GetItemsService);
  addItemPanelServ = inject(AddItemPanelService);
  showPanel = false;
  items = null;

  admin = inject(AdminCanService);
  route = inject(Router);
  ngOnInit(): void {
    this.admin.isAdmin().subscribe({
      next:(d)=>{},
      error:(d)=>{this.route.navigate(["admin","sign-in"])},
    });
    this.addItemPanelServ.panelStatues.subscribe((d) => {
      this.showPanel = d;
      this.items = this.getItems.items;
    });
    this.getAllItems();
  }
  getAllItems() {
    this.getItems.getItems().subscribe((d: item[]) => {
      this.items = this.getItems.itemsDistrub(d);
    });
  }
  openAddItemPanel() {
    this.addItemPanelServ.changePanelStatues(true);
    this.addItemPanelServ.changePanelType(true);
  }
  deleteItem(item: item, index: number) {
    let cat = item.category;
   this.getItems.removeItem(item,index)
  }
  editItem(cat: string, index: number) {
    this.addItemPanelServ.addPanelData(
      this.getItems.items[cat][index],
      cat,
      index
    );

    this.addItemPanelServ.changePanelStatues(false);
    this.addItemPanelServ.changePanelType(false);
  }
}
