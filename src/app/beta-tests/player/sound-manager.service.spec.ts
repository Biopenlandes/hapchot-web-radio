/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoundManagerService } from './sound-manager.service';

describe('Service: SoundManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundManagerService]
    });
  });

  it('should ...', inject([SoundManagerService], (service: SoundManagerService) => {
    expect(service).toBeTruthy();
  }));
});
