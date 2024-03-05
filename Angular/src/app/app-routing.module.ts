import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { isLoggedInGuard } from './is-logged-in.guard';


const routes: Routes = [

  { path: '', redirectTo:'login',pathMatch:'full'},
  {
    path:'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [isLoggedInGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
