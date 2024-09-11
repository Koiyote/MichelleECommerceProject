import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:8080/api/address/verify';

  constructor(private http: HttpClient) {}

  verifyAddress(address: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, address);
  }
}
