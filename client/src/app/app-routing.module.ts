import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./movies/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'search/:id',
    loadChildren: () => import('./movies/search/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'myList',
    loadChildren: () => import('./movies/my-list/my-list.module').then( m => m.MyListPageModule)
  },
/*   {
    path: 'add',
    loadChildren: () => import('./movies/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./movies/edit/edit.module').then( m => m.EditPageModule)
  },
  
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
