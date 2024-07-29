import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { PurchaseResponse } from '../common/purchase-response';
import {environment} from "../../environments/environment";
import {PaymentInfo} from "../common/payment-info";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = environment.MichiShopApiUrl + 'checkout/purchase';

  private paymentIntentUrl = environment.MichiShopApiUrl + '/checkout/payment-intent'

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<PurchaseResponse> {
    console.log('Placing order:', purchase); // Add logging for debugging
    return this.httpClient.post<PurchaseResponse>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
