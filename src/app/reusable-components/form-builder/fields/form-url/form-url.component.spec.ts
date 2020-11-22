import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormUrlComponent } from './form-url.component';

describe('FormUrlComponent', () => {
  let component: FormUrlComponent;
  let fixture: ComponentFixture<FormUrlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
