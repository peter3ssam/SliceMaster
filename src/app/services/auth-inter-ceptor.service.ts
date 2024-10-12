import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterCeptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('account');
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      console.log(newReq);
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
