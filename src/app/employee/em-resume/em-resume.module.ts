import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmResumePageRoutingModule } from './em-resume-routing.module';

import { EmResumePage } from './em-resume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmResumePageRoutingModule
  ],
  declarations: [EmResumePage]
})
export class EmResumePageModule {}
