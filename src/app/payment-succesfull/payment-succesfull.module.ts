import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccesfullPageRoutingModule } from './payment-succesfull-routing.module';

import { PaymentSuccesfullPage } from './payment-succesfull.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccesfullPageRoutingModule
  ],
  declarations: [PaymentSuccesfullPage]
})
export class PaymentSuccesfullPageModule {}
