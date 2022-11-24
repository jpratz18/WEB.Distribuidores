import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch : 'full', redirectTo: 'admin'},
  { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'admin'},
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
        {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)},
    ]
  },
  {
    path       : '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component  : LayoutComponent,
    resolve    : {
        initialData: InitialDataResolver,
    },
    children   : [
        {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
