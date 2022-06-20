import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchjobsPageRoutingModule } from './searchjobs-routing.module';

import { SearchjobsPage } from './searchjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchjobsPageRoutingModule
  ],
  declarations: [SearchjobsPage]
})
export class SearchjobsPagodule {}
