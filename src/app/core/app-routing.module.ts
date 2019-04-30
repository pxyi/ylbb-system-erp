import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/index',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { reuse: true },
    loadChildren: 'src/app/base/base.module#BaseModule'
  },
  {
    path: 'login',
    data: { reuse: true },
    loadChildren: 'src/app/modules/login/login.module#LoginModule'
  },
  {
    path: 'system',
    loadChildren: 'src/app/modules/system/system.module#SystemModule'
  },
  {
    path: '**',
    redirectTo: '/system/error/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
