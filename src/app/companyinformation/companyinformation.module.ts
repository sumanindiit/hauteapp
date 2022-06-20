import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyinformationPageRoutingModule } from './companyinformation-routing.module';

import { CompanyinformationPage } from './companyinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyinformationPageRoutingModule
  ],
  declarations: [CompanyinformationPage]
})
export class CompanyinformationPageModule {}
