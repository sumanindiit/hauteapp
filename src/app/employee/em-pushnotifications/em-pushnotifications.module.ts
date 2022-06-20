import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmPushnotificationsPageRoutingModule } from './em-pushnotifications-routing.module';

import { EmPushnotificationsPage } from './em-pushnotifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmPushnotificationsPageRoutingModule
  ],
  declarations: [EmPushnotificationsPage]
})
export class EmPushnotificationsPageModule {}
