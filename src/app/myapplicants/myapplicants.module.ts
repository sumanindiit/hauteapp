import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyapplicantsPageRoutingModule } from './myapplicants-routing.module';

import { MyapplicantsPage } from './myapplicants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyapplicantsPageRoutingModule
  ],
  declarations: [MyapplicantsPage]
})
export class MyapplicantsPageModule {}
