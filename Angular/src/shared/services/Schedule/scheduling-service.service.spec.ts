import { TestBed } from '@angular/core/testing';

import { SchedulingServiceService } from './scheduling-service.service';

describe('SchedulingServiceService', () => {
  let service: SchedulingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
