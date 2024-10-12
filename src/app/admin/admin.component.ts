import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { AdminCanService } from '../services/admin-can.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  providers: [SignInService, AdminCanService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
