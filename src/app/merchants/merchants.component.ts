import { Component, OnInit } from '@angular/core';
import { MerchantAccountService } from '../services/merchant-account.service';
import { map, Observable } from 'rxjs';
import { Merchant, MerchantAccount } from '../interfaces/merchant-account';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {

  // Init.
  public customer = 'New Customer';
  public merchantAccounts$ = new Observable<MerchantAccount[]>();

  // State of Customer.
  private toogleState = false;

  constructor(private MerchantAccountsApiService: MerchantAccountService) { }

  ngOnInit(): void {
    // Get the MerchantsAccounts.
    this.merchantAccounts$ = this.MerchantAccountsApiService.getMerchantAccounts().pipe(map((data => {
      // Return only the Merchant, that configuration number '01' included.
      return data.filter(item => item.MerchantAccount.MerchantAccountId?.match(/[0-9]{4}-[0-9]{4}-[a-z]{2}-01/i))
    })));

  }

  handleCustomer(state: boolean) {
    this.toogleState = state;
  }

  // Get the current clicked Merchant Account.
  setMerchant(merchant: Merchant){
    // Transfer the merchant via service.
    this.MerchantAccountsApiService.setMerchantAccount(merchant, this.toogleState); 
  }
}