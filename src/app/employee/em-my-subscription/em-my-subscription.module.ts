import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmMySubscriptionPageRoutingModule } from './em-my-subscription-routing.module';

import { EmMySubscriptionPage } from './em-my-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmMySubscriptionPageRoutingModule
  ],
  declarations: [EmMySubscriptionPage]
})
export class EmMySubscriptionPageModule {}
