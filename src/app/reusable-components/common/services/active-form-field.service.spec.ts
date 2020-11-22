import { TestBed } from '@angular/core/testing';

import { ActiveFormFieldService } from './active-form-field.service';

describe('ActiveFormFieldService', () => {
  let service: ActiveFormFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveFormFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
