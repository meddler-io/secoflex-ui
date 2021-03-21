import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedJobComponent } from './selected-job.component';

describe('SelectedJobComponent', () => {
  let component: SelectedJobComponent;
  let fixture: ComponentFixture<SelectedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
