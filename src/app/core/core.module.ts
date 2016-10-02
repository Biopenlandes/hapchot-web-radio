import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CoreComponent }    from './core.component';
import { CoreRouting }       from './core.routing';
import { SoundPlayerModule } from '../sound-player/sound-player.module'

import { HomeModule }    from '../home/home.module';
import { NewsModule }    from '../news/news.module';
import { PodcastsModule }    from '../podcasts/podcasts.module';
import { HangoutsModule }    from '../hangouts/hangouts.module';

import { PresentationComponent }  from '../presentation/presentation.component';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  imports: [ 
    CommonModule, 
    CoreRouting,
    SoundPlayerModule,
    HomeModule,
    NewsModule,
    PodcastsModule,
    HangoutsModule,
    CalendarModule
  ],
  declarations: [ 
    CoreComponent,  
    PresentationComponent,
  ],
  providers: [ ]
})
export class CoreModule {}

