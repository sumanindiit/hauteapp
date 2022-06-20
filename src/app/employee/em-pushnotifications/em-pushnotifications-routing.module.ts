import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmPushnotificationsPage } from './em-pushnotifications.page';

const routes: Routes = [
  {
    path: '',
    component: EmPushnotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmPushnotificationsPageRoutingModule {}
