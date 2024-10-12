import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ImageSliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  signInPanelStatus = false;
}
