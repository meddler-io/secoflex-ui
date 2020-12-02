import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerListComponent } from './docker-list.component';

describe('DockerListComponent', () => {
  let component: DockerListComponent;
  let fixture: ComponentFixture<DockerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
