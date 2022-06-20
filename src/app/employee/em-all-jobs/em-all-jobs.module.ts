import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmAllJobsPageRoutingModule } from './em-all-jobs-routing.module';

import { EmAllJobsPage } from './em-all-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmAllJobsPageRoutingModule
  ],
  declarations: [EmAllJobsPage]
})
export class EmAllJobsPageModule {}
