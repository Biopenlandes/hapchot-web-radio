import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';

import { AdminComponent }  from './admin.component';
import { AdminRouting }    from './admin.routing';
import { LoginComponent }  from './login/login.component';

import { AuthGuardService }from './auth-guard.service';
import { AuthService}      from './login/auth.service';

@NgModule({
  imports:      [ CommonModule, AdminRouting ],
  declarations: [ AdminComponent, LoginComponent ],
  providers:    [ AuthService, AuthGuardService]
})
export class AdminModule {}
