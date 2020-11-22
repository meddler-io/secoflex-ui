import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormEnumComponent } from './form-enum.component';

describe('FormEnumComponent', () => {
  let component: FormEnumComponent;
  let fixture: ComponentFixture<FormEnumComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
