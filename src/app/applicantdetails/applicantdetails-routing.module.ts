import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantdetailsPage } from './applicantdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantdetailsPageRoutingModule {}
