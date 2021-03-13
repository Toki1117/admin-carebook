import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastService } from 'src/app/shared/toast/toast/toast.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiError } from '../models/api-error.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/authentication']);
        }

        if (err.status !== 500 && !!err.error && !!err.error.message) {
          if (err.status === 404) {
            this.alertService.show({
              text: 'Recurso no encontrado',
              type: 'danger',
            });
          } else {
            this.alertService.show({
              text:
                err.error.message || 'Ups, hubo un error, intentalo mas tarde',
              type: 'danger',
            });
          }
        }

        const error = err.error || err.statusText;
        return throwError(error as ApiError);
      })
    );
  }
}
