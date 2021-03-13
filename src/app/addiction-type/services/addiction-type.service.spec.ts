import { TestBed } from '@angular/core/testing';

import { AddictionTypeService } from './addiction-type.service';

describe('AddictionTypeService', () => {
  let service: AddictionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddictionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
