import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { MessagePanelComponent } from '../../../dynamiComponents/message-panel/message-panel.component';
import { AdminCanService } from '../../../services/admin-can.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule, MessagePanelComponent],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css',
})
export class AdminContactComponent implements OnInit {
  admin = inject(AdminCanService);
  route = inject(Router);
  ngOnInit(): void {
    this.admin.isAdmin().subscribe({
      next:(d)=>{},
      error:(d)=>{this.route.navigate(["admin","sign-in"])},
    });
    this.mesServ.panelOpen.subscribe((d) => {
      this.panelState = d;
    });

    this.getMessages();
  }
  getMessages() {
    this.mesServ.getMessages().subscribe((d: any) => {
      this.messages = d;
    });
  }
  mesServ = inject(ContactService);
  messages = this.mesServ.messages;
  panelState = false;
  removeMessage(id) {
    this.mesServ.removeMessage(id).subscribe((d) => {});

    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === id) {
        this.messages.splice(i, 1);
      }
    }
  }
  openPanel(id: number) {
    this.mesServ.setCurrentMessage(id);
    this.mesServ.changePanelStatues();
  }
}
