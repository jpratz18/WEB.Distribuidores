import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

const adminRoutes: Route[] = [
  {
      path     : '',
      component: HomeComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
