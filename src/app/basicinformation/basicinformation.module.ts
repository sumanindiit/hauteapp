import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicinformationPageRoutingModule } from './basicinformation-routing.module';

import { BasicinformationPage } from './basicinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicinformationPageRoutingModule
  ],
  declarations: [BasicinformationPage]
})
export class BasicinformationPageModule {}
