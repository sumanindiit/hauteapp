import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsEmPageRoutingModule } from './tabs-em-routing.module';

import { TabsEmPage } from './tabs-em.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsEmPageRoutingModule
  ],
  declarations: [TabsEmPage]
})
export class TabsEmPageModule {}
