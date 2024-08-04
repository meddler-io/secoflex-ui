import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResultContentComponent } from './job-result-content.component';

describe('JobResultContentComponent', () => {
  let component: JobResultContentComponent;
  let fixture: ComponentFixture<JobResultContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobResultContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobResultContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
