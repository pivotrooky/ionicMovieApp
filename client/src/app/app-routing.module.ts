import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./movies/detail/detail.module').then( m => m.DetailPageModule)
  }
/*   {
    path: 'add',
    loadChildren: () => import('./movies/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./movies/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'my-list',
    loadChildren: () => import('./movies/my-list/my-list.module').then( m => m.MyListPageModule)
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
