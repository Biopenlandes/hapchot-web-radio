/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PodcastsService } from './podcasts.service';

describe('Service: Podcasts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PodcastsService]
    });
  });

  it('should ...', inject([PodcastsService], (service: PodcastsService) => {
    expect(service).toBeTruthy();
  }));
});
