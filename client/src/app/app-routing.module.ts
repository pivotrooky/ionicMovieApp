import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { 
  AuthGuardService as AuthGuard 
} from './services/auth.guard.service';
import { 
  UnAuthGuardService as UnAuthGuard 
} from './services/unauth.guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myList",
    pathMatch: "full",
  },
  {
    path: "logout",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./auth/logout/logout.module").then((m) => m.LogoutPageModule),
  },
  {
    path: "login",
    canActivate : [UnAuthGuard],
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    canActivate : [UnAuthGuard],
    loadChildren: () =>
      import("./auth/register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  
  {
    path: "search",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/search/search.module").then((m) => m.SearchPageModule),
  },
  {
    path: "search/:id",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/search/detail/detail.module").then(
        (m) => m.DetailPageModule
      ),
  },
  {
    path: "myList",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/my-list/my-list.module").then((m) => m.MyListPageModule),
  },
  {
    path: "myList/:id",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/my-list/my-detail/my-detail.module").then(
        (m) => m.MyDetailPageModule
      ),
  },
  {
    path: "add",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/my-list/add/add.module").then((m) => m.AddPageModule),
  },
  {
    path: "edit/:id",
    canActivate : [AuthGuard],
    loadChildren: () =>
      import("./movies/my-list/edit/edit.module").then((m) => m.EditPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
