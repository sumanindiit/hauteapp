import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmSubscriptionPageRoutingModule } from './em-subscription-routing.module';

import { EmSubscriptionPage } from './em-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmSubscriptionPageRoutingModule
  ],
  declarations: [EmSubscriptionPage]
})
export class EmSubscriptionPageModule {}
