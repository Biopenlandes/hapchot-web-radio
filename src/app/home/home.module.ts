import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ListenLiveRadioComponent } from './listen-live-radio/listen-live-radio.component';
import { PageSliderModule } from 'ng2-page-slider';

@NgModule({
  imports: [
    CommonModule,
    PageSliderModule
  ],
  declarations: [
    HomeComponent,
    NewsletterComponent, 
    ListenLiveRadioComponent
  ]
})
export class HomeModule { }
