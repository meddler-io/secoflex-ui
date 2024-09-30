import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDeploymentConfigComponent } from './worker-deployment-config.component';

describe('WorkerDeploymentConfigComponent', () => {
  let component: WorkerDeploymentConfigComponent;
  let fixture: ComponentFixture<WorkerDeploymentConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerDeploymentConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDeploymentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
