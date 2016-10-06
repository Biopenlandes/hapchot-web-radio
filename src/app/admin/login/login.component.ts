import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  message: string = '';
  errorMessage : string = '';

  constructor(public authService: AuthService, public router: Router) {}

  login(email, password) {
    this.message = 'Login en cours ...';

    this.authService.loginAsUser(email,password).then( () => {
      if (this.authService.isLoggedIn)
      {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        // Redirect the user
        this.router.navigate([redirect]);
      }        
    } ).catch( (error) => { this.message = 'Erreur ! Essaye encore mon gars'; this.errorMessage = error.message});    
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/