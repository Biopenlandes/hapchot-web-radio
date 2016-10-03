import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AdminComponent }          from './admin.component';
import { AdminRouting }            from './admin.routing';
import { LoginComponent }          from './login/login.component';

import { AuthGuardService }        from './auth-guard.service';
import { AuthService}              from './login/auth.service';
import { NewsManagerComponent }    from './news-manager/news-manager.component';
import { HangoutsManagerComponent }from './hangouts-manager/hangouts-manager.component';
import { AdminHomeComponent }      from './admin-home.component';

@NgModule({
  imports:      [ CommonModule, AdminRouting, FormsModule ],
  declarations: [ 
    AdminComponent, 
    LoginComponent, 
    NewsManagerComponent, 
    HangoutsManagerComponent,
    AdminHomeComponent
  ],
  providers:    [ AuthService, AuthGuardService]
})
export class AdminModule {}
