import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryAddComponent } from './repository-add.component';

describe('RepositoryAddComponent', () => {
  let component: RepositoryAddComponent;
  let fixture: ComponentFixture<RepositoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
