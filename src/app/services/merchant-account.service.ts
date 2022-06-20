import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkouts } from '../interfaces/checkout';
import { CheckoutResponse } from '../interfaces/checkoutResponse';
import { Merchant, MerchantAccount } from '../interfaces/merchant-account';
import { Product } from '../interfaces/product';
import { Environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class MerchantAccountService {

  constructor(private http: HttpClient) {
    // Init.
    this.toggleState = false;
    this.headers = new HttpHeaders(
      {
        'EsbApi-Subscription-Key': Environment.esbApiSubscriptionKey,
        'Content-Type': 'application/json'
      }
    );
  }

  // Declare.
  public merchantAccount!: Merchant;
  public toggleState!: boolean;

  private headers!: HttpHeaders;

  // Get all Merchant Accounts.
  getMerchantAccounts(): Observable<MerchantAccount[]> {
    // Mock Data.
    // return this.http.get<MerchantAccount[]>('assets/mock/merchants.json');
    return this.http.get<MerchantAccount[]>(`${Environment.apiHostPath}/public/api/payment-hub/merchant-mgmt/accounts`, { headers: this.headers });
  }

  // Get Merchant Account.
  getMerchantAccount(): Merchant {
    return this.merchantAccount;
  }

  // Get ToggleStates only for Demo.
  // It is needed to simulate new customers.
  getToggleState(): boolean {
    return this.toggleState;
  }

  // Set Merchant Account.
  setMerchantAccount(merchant: Merchant, toggleState: boolean): void {
    this.merchantAccount = merchant;

    // Only for Demo.
    this.toggleState = toggleState;
  }

  // Create SessionData for Adyen.
  createSession(checkout: Checkouts): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${Environment.apiHostPath}/public/api/payment-hub/experience/v1/checkouts`, checkout, { headers: this.headers });
  }

  // Get Product by id.
  getProduct(merchantId: string): Observable<Product[]> {
    // Mock Data.
    return this.http.get<Product[]>(`assets/mock/products/${merchantId}.json`);
  }
}
