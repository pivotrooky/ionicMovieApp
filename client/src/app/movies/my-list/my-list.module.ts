import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyListPageRoutingModule } from './my-list-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';
import { MyListPage } from './my-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    MyListPageRoutingModule
  ],
  declarations: [MyListPage]
})
export class MyListPageModule {}
