import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductDetailsComponent } from './import-product-details.component';

describe('ImportProductDetailsComponent', () => {
  let component: ImportProductDetailsComponent;
  let fixture: ComponentFixture<ImportProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
