import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDetailPageRoutingModule } from './my-detail-routing.module';

import { MyDetailPage } from './my-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDetailPageRoutingModule
  ],
  declarations: [MyDetailPage]
})
export class MyDetailPageModule {}
