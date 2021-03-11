import { TestBed } from '@angular/core/testing';

import { ArchiveTypeService } from './archive-type.service';

describe('ArchiveTypeService', () => {
  let service: ArchiveTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
