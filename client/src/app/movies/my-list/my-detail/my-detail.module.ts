import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDetailPageRoutingModule } from './my-detail-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';

import { MyDetailPage } from './my-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    MyDetailPageRoutingModule
  ],
  declarations: [MyDetailPage]
})
export class MyDetailPageModule {}
