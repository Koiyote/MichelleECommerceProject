import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderHistory} from "../common/order-history";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService implements OnInit{
  private orderUrl = environment.MichiShopApiUrl + '/orders';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory{
  _embedded:{
    orders: OrderHistory[];
  }
}
