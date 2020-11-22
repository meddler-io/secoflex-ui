import { TestBed } from '@angular/core/testing';

import { DomainApiService } from './domain-api.service';

describe('DomainApiService', () => {
  let service: DomainApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
