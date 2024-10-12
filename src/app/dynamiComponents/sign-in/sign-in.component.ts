import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(private signServ: SignInService) {}

  isRegister = true;
  changeLogenStatues() {
    this.isRegister = !this.isRegister;
  }
  close() {
    this.signServ.changePanelStatues();
  }
  submit(form: User) {
    if (this.isRegister) {
      this.signServ.sendDataToServer(form, this.isRegister).subscribe((d) => {
        this.changeLogenStatues();
      });
    } else {
      this.signServ
        .sendDataToServer(form, this.isRegister)
        .subscribe((d: string) => {
          localStorage.setItem('account', d);
          this.signServ.user.next(d);
        });

      this.close();
    }
  }
}
