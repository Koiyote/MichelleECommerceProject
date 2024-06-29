import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../components/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }



  getProductList(categoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByProductCategoryCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products))

  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories))
  }

  searchProducts(theKeyword: string):Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProduct{
  _embedded:{
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategories: ProductCategory[];
  }
}