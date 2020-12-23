import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDetailPage } from './my-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDetailPageRoutingModule {}
