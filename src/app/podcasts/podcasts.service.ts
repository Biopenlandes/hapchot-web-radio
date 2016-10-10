import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Podcast } from './entity/podcast';

import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class PodcastsService {
  constructor(private http : Http) {}

  updatePodcastInfos(podcast : Podcast)
  {
    this.fillPodcastInfosFromUrl(podcast.key).toPromise().then(result => this.transferInfosFrom(podcast, result));
  }

  transferInfosFrom(podcast : Podcast, podcastModel : Podcast) : Podcast
  {
    podcast.title       = podcastModel.title;
    podcast.description = podcastModel.description;
    podcast.pictures    = podcastModel.pictures;
    podcast.audioLength = podcastModel.audioLength;
    podcast.url         = podcastModel.url;
    podcast.updatedTime = podcastModel.updatedTime;
    podcast.createdTime = podcastModel.createdTime;
    podcast.key         = podcastModel.key;

    return podcast;
  }

  fillPodcastInfosFromUrl(url : string) : Observable<Podcast>
  {
    if (url[0] != '/') url = '/' + url;
    if (url[url.length-1] != '/') url = url + '/';

    let mixcloudUrl = 'https://api.mixcloud.com' + url;

    // TODO: Add error handling
    return this.http.get(mixcloudUrl).map(response => 
    {
      let result = response.json();
      let podcast = new Podcast();
      podcast.title = result.name;
      podcast.description = result.description;
      podcast.audioLength = result.audio_length;
      podcast.url = result.url;
      podcast.pictures = result.pictures;
      podcast.updatedTime = result.updated_time;
      podcast.createdTime = result.created_time;
      return podcast;
    });
  }
}
