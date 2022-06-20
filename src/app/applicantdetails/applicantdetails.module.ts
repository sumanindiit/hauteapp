import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantdetailsPageRoutingModule } from './applicantdetails-routing.module';

import { ApplicantdetailsPage } from './applicantdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantdetailsPageRoutingModule
  ],
  declarations: [ApplicantdetailsPage]
})
export class ApplicantdetailsPageModule {}
