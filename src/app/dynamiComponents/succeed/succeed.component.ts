import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetMsgService } from '../../services/set-msg.service';

@Component({
  selector: 'app-succeed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './succeed.component.html',
  styleUrl: './succeed.component.css',
})
export class SucceedComponent implements OnInit {
  setMsg = inject(SetMsgService);
  ngOnInit(): void {
    this.setMsg.msg.subscribe((da) => {
      this.Msg = da;
    });
  }
  Msg: string = '';
  close(){
    this.Msg = ''
  }
}
