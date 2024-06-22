import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../common/product";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit{

  products: Product[] = [];

  constructor(private client: ProductService){}
  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(): void {
    this.client.getProductList().subscribe(data =>
      this.products = data
    )
  }
}
