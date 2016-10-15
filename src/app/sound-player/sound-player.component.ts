import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../shared/database.service';
import { SoundPlayerService, RadioState } from './sound-player.service';

import { Podcast } from '../podcasts/entity/podcast';
import { Track } from './track.class'

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss']
})
export class SoundPlayerComponent implements OnInit {

  podcasts : Podcast[] = [];
  track : Track;
  isRadioPlaying;
  modeRadio;
  radioState : RadioState;
  RadioState = RadioState;

  constructor(private db : DatabaseService,
              private soundPlayer : SoundPlayerService) { }

  ngOnInit() 
  {
    this.soundPlayer.initMixcloudPlayer(document.getElementById('mixcloud-frame'));    

    this.soundPlayer.getModeRadio().subscribe(mode => this.modeRadio = mode);
    this.soundPlayer.getRadioState().subscribe(state => this.radioState = state);
    this.soundPlayer.getRadioTrack().subscribe(track => this.track = track);

    this.db.getLatestPodcasts().subscribe(podcasts => this.podcasts = podcasts);    
  }

  setStateClasses() {
    let classes =  {
      stopped: this.radioState == RadioState.Stopped,      
      loading: this.radioState == RadioState.Loading, // false
      playing: this.radioState == RadioState.Playing,     // true
    };
    return classes;
  }

}
