import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmNotificationsPage } from './em-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: EmNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmNotificationsPageRoutingModule {}
