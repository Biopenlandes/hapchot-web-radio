import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundPlayerComponent } from './sound-player.component';
import { SoundPlayerService } from './sound-player.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    /*SoundPlayerComponent*/
  ],
  providers : [ SoundPlayerService ]
})
export class SoundPlayerModule { }
