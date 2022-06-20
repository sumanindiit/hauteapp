import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushnotificationsPageRoutingModule } from './pushnotifications-routing.module';

import { PushnotificationsPage } from './pushnotifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushnotificationsPageRoutingModule
  ],
  declarations: [PushnotificationsPage]
})
export class PushnotificationsPageModule {}
