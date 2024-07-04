import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDomainComponent } from './field-domain.component';

describe('FieldDomainComponent', () => {
  let component: FieldDomainComponent;
  let fixture: ComponentFixture<FieldDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
