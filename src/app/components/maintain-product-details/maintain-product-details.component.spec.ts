import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainProductDetailsComponent } from './maintain-product-details.component';

describe('MaintainProductDetailsComponent', () => {
  let component: MaintainProductDetailsComponent;
  let fixture: ComponentFixture<MaintainProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintainProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaintainProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
