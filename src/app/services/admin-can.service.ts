import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ContactService } from './contact.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCanService implements CanActivate {
  router = inject(Router);
  contactServ = inject(ContactService);
  http = inject(HttpClient);
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | any {
    if (
      this.isAdmin().subscribe((d) => {
        console.log(d);
        return true;
      })
    )
      return true;
  }
  isAdmin() {
    return this.http.get('https://localhost:44301/api/Contact/getMessages');
  }
}
