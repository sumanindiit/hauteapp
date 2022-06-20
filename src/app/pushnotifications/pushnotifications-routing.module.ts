import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushnotificationsPage } from './pushnotifications.page';

const routes: Routes = [
  {
    path: '',
    component: PushnotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushnotificationsPageRoutingModule {}
