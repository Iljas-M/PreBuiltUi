import { Component, OnInit, ViewChild } from '@angular/core';
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { JsonPipe } from '@angular/common';
import { MerchantAccountService } from '../services/merchant-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutResponse, Response } from '../interfaces/checkoutResponse';
import { PaymentMethod } from '@adyen/api-library/lib/src/typings/checkout/paymentMethod';
import { createDefaultResponsePaymentMethod, ResponsePaymentMethod } from '../interfaces/paymentMethod';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-drop-in',
  templateUrl: './drop-in.component.html',
  styleUrls: ['./drop-in.component.scss']
})


export class DropInComponent implements OnInit {

  public configuration:any;
  public welcomeLabel = 'Dear new customer';
  public resultResponse:any;
  public paymentMethod: ResponsePaymentMethod = createDefaultResponsePaymentMethod();

  private sessionData = <CheckoutResponse> {};
  private routeState: any;

  @ViewChild('modalContent') content: any;

  constructor(private MerchantAccountService: MerchantAccountService, private router: Router) {    

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routeState) {
        this.sessionData.CheckoutResponse = this.routeState.CheckoutResponse ? JSON.parse(this.routeState.CheckoutResponse) : '';
      }
    }
    
    const configuration = {
      environment: 'test', // Change to 'live' for the live environment.
      clientKey: 'test_QD4CONMRKVDNTDMDQ5GXR7XKJAJQTUYI', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      session: {
         id: this.sessionData.CheckoutResponse.PaymentCheckoutID, // Unique identifier for the payment session.
         sessionData: this.sessionData.CheckoutResponse.SessionData // The payment session data.
      },
      onPaymentCompleted: (result: any, component: any) => {
          this.resultResponse = JSON.stringify({resultCode: result?.resultCode, sessionData: result?.sessionData, name: this.paymentMethod?.name, id: this.paymentMethod?.id });

          let myModalEl = document.getElementById('#myModal')
          let myModal = bootstrap.Modal.getOrCreateInstance(myModalEl!);

          myModal?.show();
          
      },
      onError: (error: any, component:any ) => {
          console.error(error.name, error.message, error.stack, component);
      },
      // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
      // For example, this is 3D Secure configuration for cards:
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: false
        }
      }
    };

    this.configuration = configuration;
   }

  async ngOnInit(): Promise<void> {
    
    // Create an instance of AdyenCheckout using the configuration object.
    const checkout = await AdyenCheckout(this.configuration);

    // Only for the First Card...
    const paymentMethodResponse = checkout.paymentMethodsResponse.storedPaymentMethods[0];
    this.paymentMethod = paymentMethodResponse as unknown as ResponsePaymentMethod;

    // Create an instance of Drop-in and mount it to the container you created.
    const dropinComponent = checkout.create('dropin').mount('#dropin-container');
    
    // Handle New/Old Customer.
    if (this.paymentMethod != undefined && this.paymentMethod != null){
      this.welcomeLabel = 'Welcome back ';
    }
  }
}
