import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerSearchComponent } from './docker-search.component';

describe('DockerSearchComponent', () => {
  let component: DockerSearchComponent;
  let fixture: ComponentFixture<DockerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
