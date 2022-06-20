import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmNotificationsPageRoutingModule } from './em-notifications-routing.module';

import { EmNotificationsPage } from './em-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmNotificationsPageRoutingModule
  ],
  declarations: [EmNotificationsPage]
})
export class EmNotificationsPageModule {}
