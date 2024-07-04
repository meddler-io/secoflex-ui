import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormIpaddressComponent } from './form-ipaddress.component';

describe('FormIpaddressComponent', () => {
  let component: FormIpaddressComponent;
  let fixture: ComponentFixture<FormIpaddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIpaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIpaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
