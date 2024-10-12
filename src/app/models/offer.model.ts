import { item } from './item.model';

export class offer {
  // static i = 0;
  constructor(
    public name: string,
    public imgSrc: string,
    public price: number,
    public offerLink: string = 'menu/offers/',
    public quantity: number = 1,
    public item: item[] = null,
    public id: number = null
  ) {
    // offer.i++;
  }
}
