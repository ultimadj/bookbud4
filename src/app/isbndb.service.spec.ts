/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IsbndbService } from './isbndb.service';

describe('IsbndbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsbndbService]
    });
  });

  it('should ...', inject([IsbndbService], (service: IsbndbService) => {
    expect(service).toBeTruthy();
  }));
});
