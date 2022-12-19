import { TestBed } from '@angular/core/testing';

import { ProductManagementService } from './productmanagement.service';

describe('ProductManagementService', () => {
  let service: ProductManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
