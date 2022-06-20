import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() product!:Product;
  @Input() index!: string;

  public products:Product [] = [] ;

  constructor() { }

  ngOnInit(): void {
    this.index = this.index.replace('#', '');
  }

}

