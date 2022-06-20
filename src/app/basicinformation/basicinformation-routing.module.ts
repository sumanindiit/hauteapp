import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicinformationPage } from './basicinformation.page';

const routes: Routes = [
  {
    path: '',
    component: BasicinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicinformationPageRoutingModule {}
