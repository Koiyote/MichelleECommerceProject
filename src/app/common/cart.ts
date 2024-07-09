import {Product} from "./product";

export class CartItem {
  id: String;
  name: string;
  imageUrl: string;
  unitPrice: number;

  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.image_url;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;
  }
}
