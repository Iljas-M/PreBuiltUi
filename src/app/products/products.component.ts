import { Component, OnInit } from '@angular/core';
import { createDefaultMerchantAccount, Merchant } from '../interfaces/merchant-account';
import { Checkouts } from '../interfaces/checkout';
import { MerchantAccountService } from '../services/merchant-account.service';
import { CheckoutResponse } from '../interfaces/checkoutResponse';
import { catchError, delay, filter, map, Observable, of, Subscription, takeLast, tap } from 'rxjs';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { createDefaultProduct, Product, Products } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private MerchantAccountService: MerchantAccountService, private router: Router) { }

  // Init.
  public checkout?: Checkouts;
  private merchant: Merchant = createDefaultMerchantAccount();
  public merchantAccountId: string = '-1';
  private senderId: string = '-1';
  private subscriptions: Subscription[] = [];
  public toggleState = false;

  // Init for Products.
  public items$ = new Observable<Product[]>();

  public errorMsg!: string;

  async ngOnInit(): Promise<void> {
    // Get Data from Service.
    this.merchant = this.MerchantAccountService.getMerchantAccount();
    this.toggleState = this.MerchantAccountService.getToggleState();
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

    // const dateNow: Date = new Date();
  }

  // Create new Session.
  async createSession(product: Product) {

    // Init.
    let amount = product.price == null ?  0.00 : +product.price.replace('€', '').replace(',', '.');

    // For Demo.
    if (product?.price == '') {
      amount = +product.subPrice.replace('€', '').replace(',', '.');
    }

    let shopperReference = '2123459';

    // Handle the toggleState.
    if (this.toggleState) {
      shopperReference = String(Math.floor(100000 + Math.random() * 900000))
    }

    let checkoutSession: Checkouts = {
      MessageHeader: {
        ID: 'SHOP-TEST',
        CreationDateTime: '2022-02-18T14:51:47.219Z',
        SimulationIndicator: false
      },
      MerchantPaymentIdentifiers: {
        MerchantAccountID: this.merchant.MerchantAccountId,
        SenderID: 'Local-Test'
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

    const sessionData = this.MerchantAccountService.createSession(checkoutSession);
    const subscription = await sessionData.subscribe(async data => {

      let checkoutResponse: CheckoutResponse = {
        CheckoutResponse: {
          PaymentCheckoutID: data.CheckoutResponse.PaymentCheckoutID,
          SessionData: data.CheckoutResponse.SessionData,
          ShopperReference: data.CheckoutResponse.ShopperReference,
        }
      }
      console.log(data.CheckoutResponse.PaymentCheckoutID, "PaymentCheckoutID");

      // this.subscriptions.push(subscription);
      await this.MerchantAccountService.setSessionData(checkoutResponse);

      this.router.navigate(['/merchant/' + this.merchant.MerchantAccountId + '/payment/'], {
        state: {
          CheckoutResponse: JSON.stringify({ PaymentCheckoutID: data.CheckoutResponse.PaymentCheckoutID, SessionData: data.CheckoutResponse.SessionData, ShopperReference: shopperReference }),
        }
      });

    });
  }
}
  /*
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
  */

