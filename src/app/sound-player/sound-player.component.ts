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
  nextProgram;

  constructor(private db : DatabaseService,
              private soundPlayer : SoundPlayerService) { }

  ngOnInit() 
  {
    this.soundPlayer.initMixcloudPlayer(document.getElementById('mixcloud-frame'));    

    this.soundPlayer.getModeRadio().subscribe(mode => this.modeRadio = mode);
    this.soundPlayer.getRadioState().subscribe(state => this.radioState = state);
    this.soundPlayer.getRadioTrack().subscribe(track => this.track = track);
    this.soundPlayer.getNextProgram().subscribe(nextProgram => this.nextProgram = nextProgram);

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

  formatTime(timestamp : number)
  {
    if (!timestamp) return "";
    let date = new Date(timestamp);
    let minutes = date.getMinutes();
    return date.getHours() + 'h' + (minutes < 10 ? "0" + minutes : minutes);
  }

  formatDate(timestamp : number)
  {
    
    if (!timestamp) return "";
    let diffJoursTime = Math.floor((timestamp - Date.now())/(24*3600*1000));
    //console.log("date jours time", diffJoursTime);
    if (diffJoursTime < 6)
    {
      let diffJours = (new Date(timestamp).getDay() - new Date(Date.now()).getDay() );
      //console.log("diff jours", diffJours);

      if (diffJours == 0) return "Aujourd'hui à ";
      if (diffJours == 1) return "Demain à ";

      var options = {weekday: "long"};
      return new Date(timestamp).toLocaleDateString("fr-FR", options) + ' à ';  
    }  
   
    var options2 = {weekday: "long", month: "long", day: "numeric"};
    return new Date(timestamp).toLocaleDateString("fr-FR", options2) + ' à ';
  }
}
