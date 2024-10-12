import { Component, OnInit, inject } from '@angular/core';
import { OrderPanelService } from '../../services/order-panel.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersAdminService } from '../../services/orders-admin.service';

@Component({
  selector: 'app-order-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.css',
})
export class OrderPanelComponent implements OnInit {
  orderPanel = inject(OrderPanelService);
  orderAdmin = inject(OrdersAdminService);
  orderData: Order;

  ngOnInit(): void {
    this.orderPanel.currentOrder.subscribe((d) => {
      this.orderData = d;
    });
  }
  close() {
    this.orderPanel.changePanelStatues();
    this.orderAdmin.updateOrderStatues(this.orderData).subscribe((d) => {
      this.orderData = null;
    });
  }
}
