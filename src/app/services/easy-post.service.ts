import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EasyPostService {

  private apiKey = environment.easyPostApiKey;
  private apiUrl = 'https://api.easypost.com/v2';

  constructor(private http: HttpClient) { }

  // Example: Create a shipment
  createShipment(shipment: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/shipments`, shipment, { headers });
  }

  // Example: Retrieve a shipment
  getShipment(shipmentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get(`${this.apiUrl}/shipments/${shipmentId}`, { headers });
  }

  // Other EasyPost API methods can be added here (e.g., create address, buy a label, etc.)
}
