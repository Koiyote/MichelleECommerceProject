export class PurchaseResponse {
  orderTrackingNumber: string;

  constructor(orderTrackingNumber: string) {
    this.orderTrackingNumber = orderTrackingNumber;
  }
}
