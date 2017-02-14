/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAwareDataService } from './user-aware-data.service';

describe('UserAwareDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAwareDataService]
    });
  });

  it('should ...', inject([UserAwareDataService], (service: UserAwareDataService) => {
    expect(service).toBeTruthy();
  }));
});
