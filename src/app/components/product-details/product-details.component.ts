import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../common/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductdetails();
    })
  }


  private handleProductdetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}