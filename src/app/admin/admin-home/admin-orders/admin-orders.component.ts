import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddOfferPanelService } from '../../../services/add-offer-panel.service';
import { AddOfferPanelComponent } from '../../../dynamiComponents/add-offer-panel/add-offer-panel.component';
import { OrdersService } from '../../../services/orders.service';
import { OrderPanelService } from '../../../services/order-panel.service';
import { OrderPanelComponent } from '../../../dynamiComponents/order-panel/order-panel.component';
import { OrdersAdminService } from '../../../services/orders-admin.service';
import { Order } from '../../../models/order.model';
import { AdminCanService } from '../../../services/admin-can.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AddOfferPanelComponent,
    CommonModule,
    OrderPanelComponent,
  ],
  providers: [OrderPanelService, OrdersAdminService],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent implements OnInit {
  ordersServ = inject(OrdersService);
  http = inject(HttpClient);
  orderPanelServ = inject(OrderPanelService);
  orderServ = inject(OrdersAdminService);
  showPanel = false;
  orders: Order[] = [];

  admin = inject(AdminCanService);
  route = inject(Router);
  ngOnInit(): void {
    this.admin.isAdmin().subscribe({
      next: (d) => {},
      error: (d) => {
        this.route.navigate(['admin', 'sign-in']);
      },
    });
    this.orderPanelServ.panelOpen.subscribe((d) => {
      this.showPanel = d;
    });
    this.orderServ.getAllOrders().subscribe((d: Order[]) => {
      console.log(1);
      this.orders = d;
    });
  }
  openOrderPanel(index: number) {
    this.orderPanelServ.setCurrentOrder(this.orders[index]);
    this.orderPanelServ.changePanelStatues();
  }
}
