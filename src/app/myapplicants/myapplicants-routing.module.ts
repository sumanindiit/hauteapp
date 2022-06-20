import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyapplicantsPage } from './myapplicants.page';

const routes: Routes = [
  {
    path: '',
    component: MyapplicantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyapplicantsPageRoutingModule {}
