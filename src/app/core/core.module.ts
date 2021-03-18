import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AlertModule } from '../shared/alert/alert.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:  JwtInterceptor, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:  LoaderInterceptor, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:  ErrorInterceptor, 
      multi: true
    },
  ]
})
export class CoreModule { }
