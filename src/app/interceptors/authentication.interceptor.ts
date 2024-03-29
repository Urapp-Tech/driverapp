import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = this.attachHeaders(req);
    return next
      .handle(modifiedRequest)
      .pipe(catchError((error: any) => this.handleAuthError(error)));
  }

  handleAuthError(error: HttpErrorResponse): Observable<never> {
    if (error.error.status === 401) {
      this.userService.logout();
    }
    return throwError(() => new Error(error.error.message));
  }

  attachHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const userData = this.userService.getUser();
    const token: string | undefined = userData?.token;
    let modifiedRequest = request;
    if (token) {
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set('Authorization', token),
      });
    }

    if (!modifiedRequest.headers.has('Content-Type')) {
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set(
          'Content-Type',
          'application/json'
        ),
      });
    }

    return modifiedRequest.clone(modifiedRequest);
  }
}
