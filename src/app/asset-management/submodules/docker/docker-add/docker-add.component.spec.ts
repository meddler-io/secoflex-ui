import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerAddComponent } from './docker-add.component';

describe('DockerAddComponent', () => {
  let component: DockerAddComponent;
  let fixture: ComponentFixture<DockerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
