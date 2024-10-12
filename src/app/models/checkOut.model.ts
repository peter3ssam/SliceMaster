export class checkOut {
  constructor(
    public Address: string,
    public PaymentMethod: string,
    public Id?: number,
    public OrderId?: number
  ) {}
}
