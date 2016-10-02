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

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean 
  {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting when logged
    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/