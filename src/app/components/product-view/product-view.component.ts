import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  constructor(private client: ProductService,
              private route: ActivatedRoute
              ){}
  ngOnInit() {
    this.route.paramMap.subscribe(() =>{
      this.getAllProducts()
    })

  }

  getAllProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }



  }

  handleSearchProducts(){
    const theKeyword = this.route.snapshot.paramMap.get('keyword')!;
    this.client.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )


  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
      if(hasCategoryId){
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        console.log(this.currentCategoryId);
        } else{
        this.currentCategoryId = 1;
      }

      this.client.getProductList(this.currentCategoryId).subscribe(data =>
        this.products = data
        )
      }

}
