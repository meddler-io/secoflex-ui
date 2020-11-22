import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidListComponent } from './android-list.component';

describe('AndroidListComponent', () => {
  let component: AndroidListComponent;
  let fixture: ComponentFixture<AndroidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndroidListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
