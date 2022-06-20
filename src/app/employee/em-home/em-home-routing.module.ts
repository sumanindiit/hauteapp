import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmHomePage } from './em-home.page';

const routes: Routes = [
  {
    path: '',
    component: EmHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmHomePageRoutingModule {}
