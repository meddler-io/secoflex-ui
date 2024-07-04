import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaHomeComponent } from './schema-home.component';

describe('SchemaHomeComponent', () => {
  let component: SchemaHomeComponent;
  let fixture: ComponentFixture<SchemaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
