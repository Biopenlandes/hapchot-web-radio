import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Podcast } from './entity/podcast';

import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class PodcastsService {
  constructor(private http : Http) {}

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
      return podcast;
    });
  }
}
