import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(public http: HttpClient) {}
  messages: Message[] = [];
  addMessage(msg: Message) {
    this.messages.push(msg);

    this.http
      .post('https://localhost:44301/api/Contact/CreateMessage', msg)
      .subscribe((d) => {
        console.log(d);
      });
  }
  removeMessage(id: number) {
    this.messages.splice(id, 1);
    return this.http.delete(
      'https://localhost:44301/api/Contact/DeleteMessage/' + id
    );
  }
  getMessages() {
    return this.http.get('https://localhost:44301/api/Contact/getMessages');
  }
  currentMessage = new BehaviorSubject<Message | null>(null);
  setCurrentMessage(id) {
    return this.http
      .get('https://localhost:44301/api/Contact/getMessage/' + id)
      .subscribe((d: Message) => {
        this.currentMessage.next(d);
      });
  }
  bool = false;
  panelOpen = new BehaviorSubject(this.bool);
  changePanelStatues() {
    this.bool = !this.bool;
    this.panelOpen.next(this.bool);
  }
}
