import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosHomeComponent } from './ios-home.component';

describe('IosHomeComponent', () => {
  let component: IosHomeComponent;
  let fixture: ComponentFixture<IosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
