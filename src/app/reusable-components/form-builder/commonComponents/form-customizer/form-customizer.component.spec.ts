import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCustomizerComponent } from './form-customizer.component';

describe('FormCustomizerComponent', () => {
  let component: FormCustomizerComponent;
  let fixture: ComponentFixture<FormCustomizerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCustomizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCustomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
