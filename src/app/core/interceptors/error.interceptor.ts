import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/toast/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
          location.reload();
        }

        if (err.status !== 500 && !!err.error && !!err.error.message) {
          // No works yet
          // this.alertService.show('La sesion ha expirado', { classname: 'bg-danger text-light', delay: 10000 });
        }

        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
