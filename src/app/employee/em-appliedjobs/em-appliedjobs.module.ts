import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmAppliedjobsPageRoutingModule } from './em-appliedjobs-routing.module';

import { EmAppliedjobsPage } from './em-appliedjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmAppliedjobsPageRoutingModule
  ],
  declarations: [EmAppliedjobsPage]
})
export class EmAppliedjobsPageModule {}
