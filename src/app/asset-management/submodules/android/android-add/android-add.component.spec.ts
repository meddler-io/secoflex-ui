import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidAddComponent } from './android-add.component';

describe('AndroidAddComponent', () => {
  let component: AndroidAddComponent;
  let fixture: ComponentFixture<AndroidAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndroidAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
