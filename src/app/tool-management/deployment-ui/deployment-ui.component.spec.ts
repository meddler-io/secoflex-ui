import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentUiComponent } from './deployment-ui.component';

describe('DeploymentUiComponent', () => {
  let component: DeploymentUiComponent;
  let fixture: ComponentFixture<DeploymentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
