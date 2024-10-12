import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { item } from '../../models/item.model';
import { GetItemsService } from '../../services/get-items.service';
import { AddItemPanelService } from '../../services/add-item-panel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item-panel.component.html',
  styleUrl: './add-item-panel.component.css',
})
export class AddItemPanelComponent implements OnInit {
  items = inject(GetItemsService);
  addItemPanel = inject(AddItemPanelService);
  submitItem(value: item | any) {
    let ite = new item(value.name, value.decription, value.price, value.imgSrc);
    if (this.addItemPanel.addPanel === true) {
      switch (value.itemCat) {
        case 'pizza':
          this.items.addItem(ite, 'pizza');
          break;
        case 'sides':
          this.items.addItem(ite, 'sides');
          break;
        case 'drinks':
          this.items.addItem(ite, 'drinks');
          break;
        case 'deserts':
          this.items.addItem(ite, 'deserts');
          break;
        case 'extras':
          this.items.addItem(ite, 'extras');
          break;
      }
    } else if (this.addItemPanel.addPanel === false) {
      let it = new item(
        value.name,
        value.decription,
        value.price,
        value.imgSrc,
        1,
        value.category,
        value.id
      );

      this.addItemPanel.panelData.subscribe((d: item) => {

        this.items.editItem(d, d.category, d.id);
      });
      // this.items.removeItem(tr.itemCat, tr.index);
      // this.items.addItem(it, tr.itemCat);
    }
  }
  close() {
    this.addItemPanel.addPanelData(new item('', '', 0, ''), '');
    this.addItemPanel.changePanelStatues(null);
    this.addItemPanel.changePanelType(null);
    this.isAddPanel = null;
  }
  data: item | any;

  ngOnInit(): void {
    this.addItemPanel.panelData.subscribe((d) => {
      this.data = d;
    });
  }
  isAddPanel: boolean | null = this.addItemPanel.addPanel;
}
