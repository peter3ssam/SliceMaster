export class item {
  constructor(
    public name: string,
    public decription: string | null,
    public price: number,
    public imgSrc: string,
    public quantity: number = 1,
    public category: string = null,
    public id: number = null,
    public offerId: number = null
  ) {}
}
