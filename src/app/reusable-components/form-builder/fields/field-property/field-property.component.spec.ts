import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPropertyComponent } from './field-property.component';

describe('FieldPropertyComponent', () => {
  let component: FieldPropertyComponent;
  let fixture: ComponentFixture<FieldPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
