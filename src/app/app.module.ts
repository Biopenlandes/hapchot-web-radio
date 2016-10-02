import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { HapchotWebRadioRoutingModule } from './app.routing';

import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';



/*import { BetaTestsComponent } from './beta-tests/beta-tests.component';
import { HomeComponent } from './home/home.component';
import { SoundPlayerComponent } from './sound-player/sound-player.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PresentationComponent } from './presentation/presentation.component';*/



// Must export the config
export const myFirebaseConfig = {
    apiKey: "AIzaSyC22ZA6UKaWEK4phq1XWZabFeM3F_BzqYY",
    authDomain: "chronogong.firebaseapp.com",
    databaseURL: "https://chronogong.firebaseio.com",
    storageBucket: "chronogong.appspot.com",
    messagingSenderId: "978696359689"
  };

@NgModule({
  declarations: [
    AppComponent      
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    HapchotWebRadioRoutingModule,
    AngularFireModule.initializeApp(myFirebaseConfig),
    CoreModule,
    AdminModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
