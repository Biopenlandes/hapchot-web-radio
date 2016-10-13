import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastComponent } from './podcast/podcast.component';
import { LatestPodcastsComponent } from './latest-podcasts/latest-podcasts.component';
import { ProgramComponent } from './program/program.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PodcastComponent, 
    LatestPodcastsComponent, 
    ProgramComponent, 
    
  ]
})
export class PodcastsModule { }
