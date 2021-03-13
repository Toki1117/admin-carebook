import { TestBed } from '@angular/core/testing';

import { PhysicalActivityService } from './physical-activity.service';

describe('PhysicalActivityService', () => {
  let service: PhysicalActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
