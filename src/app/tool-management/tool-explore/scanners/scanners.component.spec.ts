import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannersComponent } from './scanners.component';

describe('ScannersComponent', () => {
  let component: ScannersComponent;
  let fixture: ComponentFixture<ScannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
