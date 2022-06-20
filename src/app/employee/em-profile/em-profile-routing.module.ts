import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmProfilePage } from './em-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EmProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmProfilePageRoutingModule {}
