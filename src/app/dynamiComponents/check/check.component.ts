import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckService } from '../../services/check.service';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css',
})
export class CheckComponent implements OnInit {
  check = inject(CheckService);
  ngOnInit(): void {
    this.check.msg.subscribe((da) => {
      this.Msg = da;
    });
  }
  Msg: any = '';
  close() {
    this.Msg = '';
  }
  ok() {
    this.check.checkState = true;
    this.close();
  }
  cancel() {
    this.check.checkState = false;
    this.close();
  }
}
