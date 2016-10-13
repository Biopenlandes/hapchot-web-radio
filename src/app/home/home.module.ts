import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { HomeComponent }      from './home.component';
import { NewsletterComponent }from './newsletter/newsletter.component';

import { NewsListComponent } from '../news/news-list/news-list.component';
import { NewsItemComponent } from '../news/news-list/news-item/news-item.component';
import { HangoutsGridComponent } from '../hangouts/hangouts-grid/hangouts-grid.component';
import { ProgramListComponent } from '../podcasts/program-list/program-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HomeComponent,
    NewsletterComponent,
    NewsListComponent,
    NewsItemComponent,
    HangoutsGridComponent,
    ProgramListComponent,
    
  ]
})
export class HomeModule { }
