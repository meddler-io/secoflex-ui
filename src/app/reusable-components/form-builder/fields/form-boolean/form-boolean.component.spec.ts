import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormBooleanComponent } from './form-boolean.component';

describe('FormBooleanComponent', () => {
  let component: FormBooleanComponent;
  let fixture: ComponentFixture<FormBooleanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
