import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidCreateNewComponent } from './android-create-new.component';

describe('AndroidCreateNewComponent', () => {
  let component: AndroidCreateNewComponent;
  let fixture: ComponentFixture<AndroidCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndroidCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
