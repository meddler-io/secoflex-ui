import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineJobsComponent } from './pipeline-jobs.component';

describe('PipelineJobsComponent', () => {
  let component: PipelineJobsComponent;
  let fixture: ComponentFixture<PipelineJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
