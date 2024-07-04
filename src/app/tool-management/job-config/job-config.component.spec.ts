import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobConfigComponent } from './job-config.component';

describe('JobConfigComponent', () => {
  let component: JobConfigComponent;
  let fixture: ComponentFixture<JobConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
