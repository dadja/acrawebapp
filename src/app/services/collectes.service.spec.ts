import { TestBed } from '@angular/core/testing';

import { CollectesService } from './collectes.service';

describe('CollectesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectesService = TestBed.get(CollectesService);
    expect(service).toBeTruthy();
  });
});
