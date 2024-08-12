import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsListForInputComponent } from './tools-list-for-input.component';

describe('ToolsListForInputComponent', () => {
  let component: ToolsListForInputComponent;
  let fixture: ComponentFixture<ToolsListForInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsListForInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsListForInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
