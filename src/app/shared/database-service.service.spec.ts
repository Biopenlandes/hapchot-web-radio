/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatabaseServiceService } from './database-service.service';

describe('Service: DatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseServiceService]
    });
  });

  it('should ...', inject([DatabaseServiceService], (service: DatabaseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
