import { TestBed } from '@angular/core/testing';

import { PartenaireAuthService } from './partenaire-auth.service';

describe('PartenaireAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartenaireAuthService = TestBed.get(PartenaireAuthService);
    expect(service).toBeTruthy();
  });
});
