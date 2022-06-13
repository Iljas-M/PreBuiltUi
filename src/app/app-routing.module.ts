import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropInComponent } from './drop-in/drop-in.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: 'merchants',
    pathMatch: 'full'
  },
  {
    path: 'merchant/:id/payment',
    component: DropInComponent
  },
  {
    path: 'merchants',
    component: MerchantsComponent
  },
  {
    path: 'merchant/:id/products',
    component: ProductsComponent
  },
  {
    path: 'merchant/:id/notfound',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'merchants',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }