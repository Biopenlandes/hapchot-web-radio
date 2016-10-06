import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { CKEditorModule }          from 'ng2-ckeditor';
import { PolymerElement }          from '@vaadin/angular2-polymer';


import { AdminComponent }          from './admin.component';
import { AdminRouting }            from './admin.routing';
import { LoginComponent }          from './login/login.component';

import { AuthGuardService }        from './auth-guard.service';
import { AuthService}              from './login/auth.service';
import { NewsManagerComponent }    from './news-manager/news-manager.component';
import { HangoutsManagerComponent }from './hangouts-manager/hangouts-manager.component';
import { AdminHomeComponent }      from './admin-home.component';
import { HangoutEditComponent } from './hangouts-manager/hangout-edit/hangout-edit.component';

@NgModule({
  imports:      [ 
    CommonModule, 
    AdminRouting, 
    FormsModule, 
    CKEditorModule
  ],
  declarations: [ 
    AdminComponent, 
    LoginComponent, 
    NewsManagerComponent, 
    HangoutsManagerComponent,
    AdminHomeComponent,
    PolymerElement('vaadin-upload'),
    HangoutEditComponent 
  ],
  providers:    [ AuthService, AuthGuardService],
})
export class AdminModule {}
