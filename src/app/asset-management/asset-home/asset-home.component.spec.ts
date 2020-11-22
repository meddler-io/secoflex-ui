import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHomeComponent } from './asset-home.component';

describe('AssetHomeComponent', () => {
  let component: AssetHomeComponent;
  let fixture: ComponentFixture<AssetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
