import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {

  contactServ = inject(ContactService);
  submit(data: Message) {
    this.contactServ.addMessage(data);
  }
}
