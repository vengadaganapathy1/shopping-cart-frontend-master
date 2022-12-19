import { Component, OnInit } from '@angular/core';

import { ProductDetails } from 'src/app/models/product-details.model';
import { RedirectModes } from '../../constants/constant';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  currentProductDetail: ProductDetails = {};

  constructor(private productManagementService: ProductManagementService) {}

  showProductDetails(productDetails: ProductDetails): void {
    this.currentProductDetail = productDetails;
  }

  ngOnInit(): void {
    this.productManagementService.showProductDetailsObserver$.subscribe(
      (currentProduct: ProductDetails) => {
        this.showProductDetails(currentProduct);
      }
    );
  }

  showListPage(type: string): void {
    this.productManagementService.showListPageEmitter.next(type);
  }

  editProduct(): void {
    this.productManagementService.showListPageEmitter.next(
      RedirectModes.UPDATE
    );
  }
}
