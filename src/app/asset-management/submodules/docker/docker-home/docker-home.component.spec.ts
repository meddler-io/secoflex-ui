import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerHomeComponent } from './docker-home.component';

describe('DockerHomeComponent', () => {
  let component: DockerHomeComponent;
  let fixture: ComponentFixture<DockerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
