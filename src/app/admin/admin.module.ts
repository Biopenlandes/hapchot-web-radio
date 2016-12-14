import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { CKEditorModule }          from 'ng2-ckeditor';
/*import { PolymerElement }          from '@vaadin/angular2-polymer';*/
import { HttpModule, JsonpModule }  from '@angular/http';


import { AdminComponent }          from './admin.component';
import { AdminRouting }            from './admin.routing';
import { LoginComponent }          from './login/login.component';

import { AuthGuardService }        from './auth-guard.service';
import { AuthService}              from './login/auth.service';
import { AdminItemConfigService } from './shared/admin-item-config.service';

import { AdminHomeComponent }      from './admin-home.component';
import { HangoutEditComponent } from './item-edit/hangout-edit/hangout-edit.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemsListComponent } from './items-list/items-list.component';

/*import { ItemEditResolve } from './item-edit/item-edit-resolve.service';*/
import { ThemeEditComponent } from './item-edit/theme-edit/theme-edit.component';
import { ProgramEditComponent } from './item-edit/program-edit/program-edit.component';
import { PodcastEditComponent } from './item-edit/podcast-edit/podcast-edit.component';
import { ImageContentItemEditComponent } from './item-edit/image-content-item-edit/image-content-item-edit.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { ItemManagerService } from './item-manager/item-manager.service';

import { PodcastsService } from '../podcasts/podcasts.service';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';
import { NewsletterComponent } from './newsletter/newsletter.component';


@NgModule({
  imports:      [ 
    CommonModule, 
    AdminRouting, 
    FormsModule, 
    CKEditorModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ 
    AdminComponent, 
    LoginComponent,     
    AdminHomeComponent,
    ItemsListComponent, 
    ItemEditComponent,
    HangoutEditComponent,
    /*PolymerElement('vaadin-upload'),*/
    ThemeEditComponent,
    ProgramEditComponent,
    PodcastEditComponent,
    ImageContentItemEditComponent,
    ItemManagerComponent,
    PresentationEditComponent,
    NewsletterComponent, 
  ],
  providers: [ 
    AuthService, 
    AuthGuardService, 
    AdminItemConfigService,
    ItemManagerService,
    PodcastsService
  ],
})
export class AdminModule {}
