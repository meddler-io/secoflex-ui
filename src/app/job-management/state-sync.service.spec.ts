import { TestBed } from '@angular/core/testing';

import { StateSyncService } from './state-sync.service';

describe('StateSyncService', () => {
  let service: StateSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
