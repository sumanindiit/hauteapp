import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmAppliedjobsPage } from './em-appliedjobs.page';

const routes: Routes = [
  {
    path: '',
    component: EmAppliedjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmAppliedjobsPageRoutingModule {}
