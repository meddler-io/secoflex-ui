import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltImageListComponent } from './built-image-list.component';

describe('BuiltImageListComponent', () => {
  let component: BuiltImageListComponent;
  let fixture: ComponentFixture<BuiltImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuiltImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
