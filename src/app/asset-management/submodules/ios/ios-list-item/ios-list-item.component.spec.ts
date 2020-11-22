import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosListItemComponent } from './ios-list-item.component';

describe('IosListItemComponent', () => {
  let component: IosListItemComponent;
  let fixture: ComponentFixture<IosListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IosListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
