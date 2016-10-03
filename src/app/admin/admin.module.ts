import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';

import { AdminComponent }  from './admin.component';
import { AdminRouting }    from './admin.routing';
import { LoginComponent }  from './login/login.component';

import { AuthGuardService }from './auth-guard.service';
import { AuthService}      from './login/auth.service';
import { NewsManagerComponent } from './news-manager/news-manager.component';
import { HangoutsManagerComponent } from './hangouts-manager/hangouts-manager.component';

@NgModule({
  imports:      [ CommonModule, AdminRouting ],
  declarations: [ AdminComponent, LoginComponent, NewsManagerComponent, HangoutsManagerComponent ],
  providers:    [ AuthService, AuthGuardService]
})
export class AdminModule {}
