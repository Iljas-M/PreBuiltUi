import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Checkouts } from '../interfaces/checkout';
import { CheckoutResponse, createDefaultCheckoutResponse } from '../interfaces/checkoutResponse';
import { createDefaultMerchantAccount, Merchant, MerchantAccount } from '../interfaces/merchant-account';
import { Product, Products } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class MerchantAccountService {

  constructor(private http: HttpClient) { }

  public merchantAccount: Merchant = createDefaultMerchantAccount();
  public sessionData: CheckoutResponse = createDefaultCheckoutResponse();
  public toggleState = false;

  private subscriptionKey: string = '';
  private contentType: string = 'application/json';
  private headers = new HttpHeaders({ 'EsbApi-Subscription-Key': this.subscriptionKey, 'Content-Type': this.contentType });
  private apiHostPath = "";

  // Get all Merchant Accounts.
  getMerchantAccounts(): Observable<MerchantAccount[]> {
    // return this.http.get<MerchantAccount[]>('assets/mock/merchants.json');
    return this.http.get<MerchantAccount[]>(`${this.apiHostPath}/public/api/payment-hub/merchant-mgmt/accounts`, { headers: this.headers });
  }

  // Get Merchant Account.
  getMerchantAccount(): Merchant {
    return this.merchantAccount;
  }

  // Get ToggleStates for Demo.
  getToggleState(): boolean {
    return this.toggleState;
  }

  // Set Merchant Account.
  setMerchantAccount(merchant: Merchant, toggleState: boolean ): void {
    this.merchantAccount = merchant;
    this.toggleState = toggleState;
  }

  // Create SessionData for Adyen.
  createSession(checkout: Checkouts): Observable<CheckoutResponse> {
    // return this.http.post<CheckoutResponse>("", checkout);
    return this.http.post<CheckoutResponse>(`${this.apiHostPath}/public/api/payment-hub/experience/v1/checkouts`, checkout, { headers: this.headers });
  }

  // Get The SessionData Adyen.
  getSessionData(){
    return this.sessionData;
  }

  // Set the SessionData from Adyen.
  setSessionData(sessionData: CheckoutResponse){
    this.sessionData = sessionData;
  }

  // Get Product
  getProduct(merchantId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`assets/mock/products/${merchantId}.json`);
  }
}
