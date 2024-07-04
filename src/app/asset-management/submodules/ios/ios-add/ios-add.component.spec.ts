import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosAddComponent } from './ios-add.component';

describe('IosAddComponent', () => {
  let component: IosAddComponent;
  let fixture: ComponentFixture<IosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
