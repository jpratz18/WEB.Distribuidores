import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';


@NgModule({
  imports  : [
      HttpClientModule
  ],
  providers: [
      AuthService,
      {
          provide : HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi   : true
      }
  ]
})
export class CoreModule { 

    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    ){
        
    }
}

