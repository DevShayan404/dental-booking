import { TestBed } from '@angular/core/testing';

import { ViewProfileService } from './view-profile.service';

describe('ViewProfileService', () => {
  let service: ViewProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
