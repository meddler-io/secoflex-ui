import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosCreateNewComponent } from './ios-create-new.component';

describe('IosCreateNewComponent', () => {
  let component: IosCreateNewComponent;
  let fixture: ComponentFixture<IosCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IosCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IosCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
