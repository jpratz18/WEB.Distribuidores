import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { authSignInRoutes } from './sign-in.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forChild(authSignInRoutes),
  ]
})
export class SignInModule { }
