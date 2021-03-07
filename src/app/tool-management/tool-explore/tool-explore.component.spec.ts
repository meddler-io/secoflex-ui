import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolExploreComponent } from './tool-explore.component';

describe('ToolExploreComponent', () => {
  let component: ToolExploreComponent;
  let fixture: ComponentFixture<ToolExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
