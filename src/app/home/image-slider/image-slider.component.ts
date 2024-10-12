import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetOffersService } from '../../services/get-offers.service';
import { GetItemsService } from '../../services/get-items.service';
@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css',
})
export class ImageSliderComponent implements OnInit {
  setInterval: any;

  ngOnInit(): void {
    this.getItems.getItems().subscribe((e) => {
      this.interval();
      this.getOffer.getOffers().subscribe((d: any) => {
        d.forEach((d) => {
          this.images.push(d.imgSrc);
          this.imageslinks.push(d.offerLink + d.id);
        });
      });
    });
  }
  interval() {
    this.setInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }
  getOffer = inject(GetOffersService);
  getItems = inject(GetItemsService);
  images = [];
  imageslinks = [];
  currentIndex = 0;
  opacity: any = 1;
  checkImageIndex(index: number) {
    if (index === this.currentIndex) {
      return 'opacity:1';
    } else {
      return 'opacity:.5';
    }
  }
  nextImage() {
    clearInterval(this.setInterval);
    this.interval();
    this.currentIndex++;
    if (this.currentIndex === this.images.length) {
      this.currentIndex = 0;
    }
  }
  prevImage() {
    clearInterval(this.setInterval);
    this.interval();
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }
  }
  chooseImage(i: number) {
    clearInterval(this.setInterval);
    this.interval();
    this.currentIndex = i;
  }
}
