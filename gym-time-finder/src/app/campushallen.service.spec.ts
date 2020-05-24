import { TestBed } from '@angular/core/testing';

import { CampushallenService } from './campushallen.service';

describe('CampushallenService', () => {
  let service: CampushallenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampushallenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
