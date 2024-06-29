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
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousKeyword: string = "";




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

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.client.searchProductsPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult())


  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
      if(hasCategoryId){
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        console.log(this.currentCategoryId);
        } else{
        this.currentCategoryId = 1;
      }

      if(this.previousCategoryId != this.currentCategoryId){
        this.thePageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;

      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

      this.client.getProductListPaginate(this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
            ).subscribe(this.processResult())
      }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.handleListProducts();
  }

  private processResult() {
      return (data: any) =>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
  }


}
