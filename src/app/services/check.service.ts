import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckService {
  constructor() {}

  msg = new BehaviorSubject('');
  setMsg(msg: string) {
    this.msg.next(msg);
  }
  checkState: boolean = false;
}
