import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private logger = inject(LoggerService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.log(`HTTP Error: ${error.status} ${error.statusText}`);
        return throwError(
          () => new Error(`An error occurred: ${error.statusText}`)
        );
      })
    );
  }
}
