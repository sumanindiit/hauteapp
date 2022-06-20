import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSuccesfullPage } from './payment-succesfull.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSuccesfullPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSuccesfullPageRoutingModule {}
