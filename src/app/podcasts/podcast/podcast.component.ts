import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Podcast } from '../entity/podcast';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {

  @Input() podcast : Podcast;
  @Output() onPlay : EventEmitter<Podcast> = new EventEmitter<Podcast>();
  
  constructor() { }

  ngOnInit() {
  }

  getAudioLength() : string 
  {
    let minutes = Math.floor(this.podcast.audioLength / 60.0);
    let hours = Math.floor((this.podcast.audioLength - minutes * 60) / 3600);
    let result = hours ? hours + "h" : "";
    result += minutes + "min";
    return result;
  }

}
