import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmPackagesPageRoutingModule } from './em-packages-routing.module';

import { EmPackagesPage } from './em-packages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmPackagesPageRoutingModule
  ],
  declarations: [EmPackagesPage]
})
export class EmPackagesPageModule {}
