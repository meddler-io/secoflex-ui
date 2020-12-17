import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolScreenComponent } from './tool-screen.component';

describe('ToolScreenComponent', () => {
  let component: ToolScreenComponent;
  let fixture: ComponentFixture<ToolScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
