import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmHomePageRoutingModule } from './em-home-routing.module';

import { EmHomePage } from './em-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmHomePageRoutingModule
  ],
  declarations: [EmHomePage]
})
export class EmHomePageModule {}
