import { Component, OnInit, Input } from '@angular/core';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import { Podcast } from '../../../podcasts/entity/podcast';
import { PodcastsService } from '../../../podcasts/podcasts.service';

import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-podcast-edit',
  templateUrl: './podcast-edit.component.html',
  styleUrls: ['./podcast-edit.component.scss']
})
export class PodcastEditComponent implements OnInit {

  private urlStream = new Subject<string>();
  podcastDate :Date;

  @Input() podcast : Podcast; 

  constructor(private podcastsService : PodcastsService) { }

  ngOnInit() {
    if (!this.podcast.publishOn) this.podcast.publishOn = Date.now();
    this.podcastDate = new Date(this.podcast.publishOn);
  }

  getInfosFromUrl(url: string) 
  { 
    this.podcastsService.fillPodcastInfosFromUrl(url).subscribe(
      podcast => this.podcast = this.podcastsService.transferInfosFrom(this.podcast, podcast),
      err => { 
        this.podcast.title = "";
        this.podcast.description = "Podcast introuvable";
        this.podcast.pictures = null; 
      });
  }

  onDateChange(value: any)
  {
    this.podcast.publishOn = new Date(value).getTime();
  } 

}
