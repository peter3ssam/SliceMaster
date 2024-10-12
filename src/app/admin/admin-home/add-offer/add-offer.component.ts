import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetOffersService } from '../../../services/get-offers.service';
import { AddOfferPanelService } from '../../../services/add-offer-panel.service';
import { AddOfferPanelComponent } from '../../../dynamiComponents/add-offer-panel/add-offer-panel.component';
import { offer } from '../../../models/offer.model';
import { AdminCanService } from '../../../services/admin-can.service';
import { item } from '../../../models/item.model';
import { GetItemsService } from '../../../services/get-items.service';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, AddOfferPanelComponent],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css',
})
export class AddOfferComponent implements OnInit {
  getOffers = inject(GetOffersService);
  getItems = inject(GetItemsService);
  addOfferPanelServ = inject(AddOfferPanelService);
  showPanel = false;
  offers: offer[] = [];
  items: any;

  admin = inject(AdminCanService);
  route = inject(Router);
  ngOnInit(): void {
    this.admin.isAdmin().subscribe({
      next: (d) => {},
      error: (d) => {
        this.route.navigate(['admin', 'sign-in']);
      },
    });
    this.addOfferPanelServ.panelStatues.subscribe((d) => {
      this.showPanel = d;
      this.offers = this.getOffers.offers;
    });

    this.getItems.getItems().subscribe((d: item[]) => {
      this.items = this.getItems.itemsDistrub(d);
    });

    this.getOffers.getOffers().subscribe((d: any) => {
      this.offers = d;
    });
  }
  openAddOfferPanel() {
    this.addOfferPanelServ.changePanelStatues(true);
    this.addOfferPanelServ.changePanelType(true);
  }
  deleteOffer(index: number) {
    this.getOffers.removeOffer(index);
  }
  editOffer(index: number) {
    this.addOfferPanelServ.addPanelData(
      this.getOffers.offers[index],

      index
    );

    this.addOfferPanelServ.changePanelStatues(false);
    this.addOfferPanelServ.changePanelType(false);
  }
}
