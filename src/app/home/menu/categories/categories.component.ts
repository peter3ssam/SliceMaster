import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private Activerouter: ActivatedRoute, private router: Router) {}
  navigate(link: string) {
    this.router.navigate(['menu', link]);
  }
}
