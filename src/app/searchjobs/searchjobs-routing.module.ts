import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchjobsPage } from './searchjobs.page';

const routes: Routes = [
  {
    path: '',
    component: SearchjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchjobsPageRoutingModule {}
