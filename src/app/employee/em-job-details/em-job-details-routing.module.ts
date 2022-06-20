import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmJobDetailsPage } from './em-job-details.page';

const routes: Routes = [
  {
    path: '',
    component: EmJobDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmJobDetailsPageRoutingModule {}
