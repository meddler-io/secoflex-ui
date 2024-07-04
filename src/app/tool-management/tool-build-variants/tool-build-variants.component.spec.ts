import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBuildVariantsComponent } from './tool-build-variants.component';

describe('ToolBuildVariantsComponent', () => {
  let component: ToolBuildVariantsComponent;
  let fixture: ComponentFixture<ToolBuildVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBuildVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBuildVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
