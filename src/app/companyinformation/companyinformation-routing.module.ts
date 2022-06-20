import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyinformationPage } from './companyinformation.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyinformationPageRoutingModule {}
