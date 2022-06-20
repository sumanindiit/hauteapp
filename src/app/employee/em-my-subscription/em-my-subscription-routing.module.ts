import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmMySubscriptionPage } from './em-my-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: EmMySubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmMySubscriptionPageRoutingModule {}
