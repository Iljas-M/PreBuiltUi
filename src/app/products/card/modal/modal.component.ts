import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createDefaultProduct, Product, Products } from 'src/app/interfaces/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() product!:Product;
  @Input() index!: string;

  public products:Product [] = [] ;
 //  @Input() titel = '';

  constructor() {
    
   }

  ngOnInit(): void {
    this.index = this.index.replace('#', '');
  }

}

