import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetMsgService } from '../../services/set-msg.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  setMsg = inject(SetMsgService);
  ngOnInit(): void {
    this.setMsg.msg.subscribe((da) => {
      this.errorMsg = da;
    });
  }
  errorMsg: string = '';
  close(){
    this.errorMsg = ''
  }
}
