import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmPackagesPage } from './em-packages.page';

const routes: Routes = [
  {
    path: '',
    component: EmPackagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmPackagesPageRoutingModule {}
