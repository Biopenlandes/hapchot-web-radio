import { Injectable  } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  isLoggedIn: Observable<boolean>;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public af: AngularFire) {
    this.isLoggedIn = this.af.auth.map( (auth) => !!auth);   
  }

  loginAsUser(email : string, password : string) 
  {
    return this.af.auth.login({
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }
    );
  }

  logout(): void {
    this.af.auth.logout();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/