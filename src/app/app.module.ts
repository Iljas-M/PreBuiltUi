import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropInComponent } from './products/drop-in/drop-in.component';
import { ProductsComponent } from './products/products.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleswitchComponent } from './merchants/toggleswitch/toggleswitch.component';
import { CardComponent } from './products/card/card.component';
import { ModalComponent } from './products/card/modal/modal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    DropInComponent,
    ProductsComponent,
    MerchantsComponent,
    ToggleswitchComponent,
    CardComponent,
    ModalComponent,
    NavigationComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
