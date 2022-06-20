import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmAllJobsPage } from './em-all-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: EmAllJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmAllJobsPageRoutingModule {}
