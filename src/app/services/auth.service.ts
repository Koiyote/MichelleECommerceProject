import { Injectable } from '@angular/core';
import { OktaAuthStateService} from '@okta/okta-angular';
import {firstValueFrom} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oktaAuthStateService: OktaAuthStateService) {}

  async getAuthToken(): Promise<string | undefined> {
    const authState = await firstValueFrom(this.oktaAuthStateService.authState$);
    return authState?.accessToken?.accessToken;
  }
}
