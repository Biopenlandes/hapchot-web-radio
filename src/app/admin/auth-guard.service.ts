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
    this.authService.redirectUrl = url;

    return this.authService.isLoggedIn.take(1).do(islogged => {
      if (!islogged) 
      {
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']); 
      }
    });     
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>
  {
    return this.canActivate(route, state);
  }

  /*checkLogin(url: string) : Observable<boolean>
  {
    return this.authService.isLoggedIn;.subscribe( (value) =>
      {
        if (value) return true;
        // Store the attempted URL for redirecting when logged
        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
      });
  }*/
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/