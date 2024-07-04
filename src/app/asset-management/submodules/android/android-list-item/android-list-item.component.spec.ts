import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidListItemComponent } from './android-list-item.component';

describe('AndroidListItemComponent', () => {
  let component: AndroidListItemComponent;
  let fixture: ComponentFixture<AndroidListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndroidListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
