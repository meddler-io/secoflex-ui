import { TestBed } from '@angular/core/testing';

import { NavbarSharedServiceService } from './navbar-shared-service.service';

describe('NavbarSharedServiceService', () => {
  let service: NavbarSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
