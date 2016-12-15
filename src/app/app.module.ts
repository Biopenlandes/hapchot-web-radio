import { BrowserModule }                 from '@angular/platform-browser';
import { NgModule }                      from '@angular/core';
/*import { FormsModule }                   from '@angular/forms';*/
import { HttpModule }                    from '@angular/http';
import { RouterModule }                  from '@angular/router';

import { AppComponent }                  from './app.component';
import { HapchotWebRadioRoutingModule }  from './app.routing';

import { AdminModule }                   from './admin/admin.module';
import { CoreModule }                    from './core/core.module';

import { AngularFireModule, AngularFire }from 'angularfire2';

import { DatabaseService }               from './shared/database.service';
import { firebaseConfig } from './shared/db-config';

import { CalendarModule } from './calendar/calendar.module';

/*import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    /*FormsModule,*/
    HttpModule,
    RouterModule,  
    HapchotWebRadioRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CoreModule,
    AdminModule,
    CalendarModule
  ],
  providers: [ AngularFire, DatabaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }