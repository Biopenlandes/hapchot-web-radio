import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  Route
}                           from '@angular/router';
import { AuthService }      from './login/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>
  {
    let url: string = state.url;
    return this.checkLogin(url);       
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>
  {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string) : Observable<boolean>
  {
    this.authService.redirectUrl = url;
    return this.authService.isLoggedIn.take(1).do(islogged => {
      if (!islogged) 
      {
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']); 
      }
    });  
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/