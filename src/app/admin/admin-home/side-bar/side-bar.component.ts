import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  @ViewChild('side') side: ElementRef;
  @ViewChild('side2') side2: ElementRef;
  @ViewChild('arrow') arrow: ElementRef;
  changeSideBarStatues() {
    this.side.nativeElement.classList.toggle('left-px');
    this.side2.nativeElement.classList.toggle('hidden');
    // this.side.nativeElement.classList.toggle('mx-10');
    this.side.nativeElement.classList.toggle('sm:-left-60');
    this.arrow.nativeElement.classList.toggle('rotate-180');
    this.arrow.nativeElement.classList.toggle('fill-gray-400');
  }
  router = inject(Router);
  logout() {
    localStorage.removeItem('account');
    this.router.navigate(['admin', 'sign-in']);
  }
}
