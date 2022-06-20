import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPaymentCardPageRoutingModule } from './add-payment-card-routing.module';

import { AddPaymentCardPage } from './add-payment-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPaymentCardPageRoutingModule
  ],
  declarations: [AddPaymentCardPage]
})
export class AddPaymentCardPageModule {}
