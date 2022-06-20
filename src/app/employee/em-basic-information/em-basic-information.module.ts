import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmBasicInformationPageRoutingModule } from './em-basic-information-routing.module';

import { EmBasicInformationPage } from './em-basic-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmBasicInformationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmBasicInformationPage]
})
export class EmBasicInformationPageModule {}
