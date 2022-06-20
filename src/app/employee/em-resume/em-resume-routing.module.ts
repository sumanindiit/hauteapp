import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmResumePage } from './em-resume.page';

const routes: Routes = [
  {
    path: '',
    component: EmResumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmResumePageRoutingModule {}
