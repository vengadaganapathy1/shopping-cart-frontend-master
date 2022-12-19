import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDetailsComponent } from './add-product-details.component';

describe('AddProductDetailsComponent', () => {
  let component: AddProductDetailsComponent;
  let fixture: ComponentFixture<AddProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
