import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryHomeComponent } from './repository-home.component';

describe('RepositoryHomeComponent', () => {
  let component: RepositoryHomeComponent;
  let fixture: ComponentFixture<RepositoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
