import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { AdminCanService } from '../../services/admin-can.service';
import { AddItemPanelService } from '../../services/add-item-panel.service';
import { AddOfferPanelService } from '../../services/add-offer-panel.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  providers: [AddItemPanelService, AddOfferPanelService],

  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  admin = inject(AdminCanService);
  ngOnInit(): void {
    this.router.navigate(['admin', 'admin-orders']);
    this.admin.isAdmin().subscribe((d) => {});
  }
  router = inject(Router);
}
