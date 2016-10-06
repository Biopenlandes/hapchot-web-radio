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

import { AdminHomeComponent }      from './admin-home.component';
import { HangoutEditComponent } from './item-edit/hangout-edit/hangout-edit.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemsListComponent } from './items-list/items-list.component';

import { ItemEditResolve } from './item-edit/item-edit-resolve.service';

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
    AdminHomeComponent,
    ItemsListComponent, 
    ItemEditComponent,
    HangoutEditComponent,
    PolymerElement('vaadin-upload'),    
  ],
  providers:    [ AuthService, AuthGuardService, ItemEditResolve],
})
export class AdminModule {}
