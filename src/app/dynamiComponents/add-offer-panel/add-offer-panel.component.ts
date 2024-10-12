import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddOfferPanelService } from '../../services/add-offer-panel.service';
import { GetOffersService } from '../../services/get-offers.service';
import { offer } from '../../models/offer.model';
import { GetItemsService } from '../../services/get-items.service';
@Component({
  selector: 'app-add-offer-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-offer-panel.component.html',
  styleUrl: './add-offer-panel.component.css',
})
export class AddOfferPanelComponent implements OnInit {
  offers = inject(GetOffersService);
  addOfferPanel = inject(AddOfferPanelService);
  submitItem(value: offer) {
    if (this.addOfferPanel.addPanel === true) {
      let ite = new offer(
        value.name,
        value.imgSrc,
        value.price,
        value.offerLink,
        1,
        value.item
      );
      this.offers.addOffer(ite);
      console.log(ite);
    } else if (this.addOfferPanel.addPanel === false) {
      let tr: offer;
      this.addOfferPanel.panelData.subscribe((d) => {
        tr = d;
      });
      this.offers.editOffer(tr);
    }
  }
  close() {
    this.addOfferPanel.addPanelData({
      name: '',
      price: 0,
      imgSrc: '',
      item: [],
    });
    this.addOfferPanel.changePanelStatues(null);
    this.addOfferPanel.changePanelType(null);
    this.isAddPanel = null;
  }
  data: offer | any;
  items = inject(GetItemsService);
  ngOnInit(): void {
    this.addOfferPanel.panelData.subscribe((d) => {
      this.data = d;
    });
  }
  isAddPanel: boolean | null = this.addOfferPanel.addPanel;
}
