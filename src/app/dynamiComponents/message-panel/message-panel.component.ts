import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-panel',
  standalone: true,
  imports: [],
  templateUrl: './message-panel.component.html',
  styleUrl: './message-panel.component.css',
})
export class MessagePanelComponent implements OnInit {
  mesServ = inject(ContactService);
  msg = null;
  ngOnInit(): void {
    this.mesServ.currentMessage.subscribe((d) => {
      this.msg = d;
    });
  }
  close(){
    this.mesServ.changePanelStatues()
    this.msg = null
  }
}
