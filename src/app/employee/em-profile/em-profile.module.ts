import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmProfilePageRoutingModule } from './em-profile-routing.module';

import { EmProfilePage } from './em-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmProfilePage]
})
export class EmProfilePageModule {}
