import { item } from './item.model';
import { offer } from './offer.model';

export class Order {
  constructor(
    public cart: [item | offer],
    public total: number = 0,
    public orderStatus = '',
    public id: number = null,
    public userId: number = null
  ) {}
}
