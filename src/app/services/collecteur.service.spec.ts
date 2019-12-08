import { TestBed } from '@angular/core/testing';

import { CollecteurService } from './collecteur.service';

describe('CollecteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollecteurService = TestBed.get(CollecteurService);
    expect(service).toBeTruthy();
  });
});
