import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFileViewerComponent } from './job-file-viewer.component';

describe('JobFileViewerComponent', () => {
  let component: JobFileViewerComponent;
  let fixture: ComponentFixture<JobFileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFileViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
