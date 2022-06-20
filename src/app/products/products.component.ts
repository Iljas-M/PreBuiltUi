import { Component, OnInit } from '@angular/core';
import { createDefaultMerchantAccount, Merchant } from '../interfaces/merchant-account';
import { Checkouts } from '../interfaces/checkout';
import { MerchantAccountService } from '../services/merchant-account.service';
import { CheckoutResponse } from '../interfaces/checkoutResponse';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private MerchantAccountService: MerchantAccountService, private router: Router) { }

  // Init Products.
  public items$ = new Observable<Product[]>();
  public errorMsg!: string;

  // Init.
  public checkout?: Checkouts;
  public toggleState = false;
  public merchantAccountId: string = '-1';

  private merchant: Merchant = createDefaultMerchantAccount();
  private senderId: string = 'Local-Test';
  private subscriptions: Subscription[] = [];

  async ngOnInit(): Promise<void> {
    // Get Data from Service.
    this.merchant = this.MerchantAccountService.getMerchantAccount();
    this.toggleState = this.MerchantAccountService.getToggleState();

    // Get the MerchantAccountId from Url.
    this.merchant.MerchantAccountId = this.router.url.split('/')[2];

    if (this.merchant?.SenderID != undefined) {
      this.senderId = this.merchant?.SenderID;
    }

    // Get the Products.
    this.items$ = this.MerchantAccountService.getProduct(this.merchant.MerchantAccountId).pipe(
      catchError(error => {
        this.router.navigate(['/merchant/' + this.merchant.MerchantAccountId + '/notfound/']);
        return of([]);
      })
    );
  }

  // Create new Session.
  async createSession(product: Product) {

    // Init.
    let amount = product.price == null ? 0.00 : +product.price.replace('€', '').replace(',', '.');
    let shopperReference = '2123459';

    // For Demo.
    if (product?.price == '') {
      amount = +product.subPrice.replace('€', '').replace(',', '.');
    }

    // Handle the toggleState.
    if (this.toggleState) {
      shopperReference = String(Math.floor(100000 + Math.random() * 900000))
    }

    // Create new Checkout Session.
    let checkoutSession: Checkouts = {
      MessageHeader: {
        ID: 'SHOP-TEST',
        CreationDateTime: '2022-02-18T14:51:47.219Z',
        SimulationIndicator: false
      },
      MerchantPaymentIdentifiers: {
        MerchantAccountID: this.merchant.MerchantAccountId,
        SenderID: this.senderId
      },
      CheckoutRequest: {
        CheckoutType: 'PreBuiltUI',
        OrderReference: '307688',
        CustomerReference: '7964',
        ShopperReference: shopperReference,
        CountryCode: 'DE',
        ReturnUrl: 'https://localhost:44303',
        Amount: {
          Currency: 'EUR',
          Value: amount
        }
      }
    }

    // Get SessionData from Adyen - DPH ESB API.
    const sessionData = this.MerchantAccountService.createSession(checkoutSession);

    // Set the SessionData.
    const subscription = await sessionData.subscribe(async data => {

      this.subscriptions.push(subscription);

      // Navigate to payment page (drop-in) - with CheckoutResponse Body via router state.
      this.router.navigate(['/merchant/' + this.merchant.MerchantAccountId + '/payment/'], {
        state: {
          CheckoutResponse: JSON.stringify({ PaymentCheckoutID: data.CheckoutResponse.PaymentCheckoutID, SessionData: data.CheckoutResponse.SessionData, ShopperReference: shopperReference }),
        }
      });

    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
