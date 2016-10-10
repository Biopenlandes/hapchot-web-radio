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

  @Input() podcast : Podcast; 

  constructor(private podcastsService : PodcastsService) { }

  ngOnInit() {
  }

  getInfosFromUrl(url: string) 
  { 
    this.podcastsService.fillPodcastInfosFromUrl(url).subscribe(
      podcast => this.podcast = this.podcastsService.transferInfosFrom(this.podcast, podcast),
      err => { 
        this.podcast = this.podcastsService.transferInfosFrom(this.podcast, new Podcast());
        this.podcast.title = "Podcast introuvable"; 
      });
  } 

}
