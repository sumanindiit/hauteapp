import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmJobDetailsPageRoutingModule } from './em-job-details-routing.module';

import { EmJobDetailsPage } from './em-job-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmJobDetailsPageRoutingModule
  ],
  declarations: [EmJobDetailsPage]
})
export class EmJobDetailsPageModule {}
