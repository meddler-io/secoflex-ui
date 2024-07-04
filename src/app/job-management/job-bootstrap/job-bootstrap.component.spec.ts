import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBootstrapComponent } from './job-bootstrap.component';

describe('JobBootstrapComponent', () => {
  let component: JobBootstrapComponent;
  let fixture: ComponentFixture<JobBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBootstrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
