import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormRichTextComponent } from './form-rich-text.component';

describe('FormRichTextComponent', () => {
  let component: FormRichTextComponent;
  let fixture: ComponentFixture<FormRichTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRichTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
