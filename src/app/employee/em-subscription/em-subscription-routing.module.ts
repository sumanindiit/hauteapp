import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmSubscriptionPage } from './em-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: EmSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmSubscriptionPageRoutingModule {}
