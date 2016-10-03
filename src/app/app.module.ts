import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AngularFire } from 'angularfire2';

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
var myFirebaseConfig = {
    apiKey: "AIzaSyBLhBiu0MS5q-Z_FXQpSHxyOPYssyMfCzs",
    authDomain: "hapchot-web-radio.firebaseapp.com",
    databaseURL: "https://hapchot-web-radio.firebaseio.com",
    storageBucket: "hapchot-web-radio.appspot.com",
    messagingSenderId: "615568695822"
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
  providers: [ AngularFire ],
  bootstrap: [AppComponent]
})
export class AppModule { }
