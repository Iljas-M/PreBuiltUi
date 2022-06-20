import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createDefaultProduct, Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Init.
  public length = 0;
  public checkoutLabel = 'Payment Checkout';

  @Input() product:Product = createDefaultProduct();
  @Input() index!: string;

  @Output() checkout = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  // Needs for Modal View.
  this.index = "#readMoreModal" + this.index;

  // Check the letters length.
  if (this.product.description.length > 300){
    this.length = 300;
  } else {
    this.length = this.product.description.length;
  }

  // Handle checkout Label
  if (this.product.price == null || this.product.price == undefined)
  {
    this.checkoutLabel = 'Preauthorization';
  }
  if (this.product?.price?.includes('-1')){

    this.checkoutLabel = 'Subscription';
    this.product.price = '';
  }
}

  handleCheckoutClick(product: Product){
    this.checkout.emit(product);
  }

  async handleReadMeClick(product: Product){
     this.product = product;
  }

}
