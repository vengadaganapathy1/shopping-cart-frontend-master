import { Component, OnInit } from '@angular/core';

import { ProductManagementService } from 'src/app/services/productmanagement.service';
import { ProductDetails } from 'src/app/models/product-details.model';
import { RedirectModes } from '../../constants/constant';
import { PROCUCT_MANAGEMENT } from '../../constants/constant';

@Component({
  selector: 'app-maintain-product-details',
  templateUrl: './maintain-product-details.component.html',
  styleUrls: ['./maintain-product-details.component.scss'],
})
export class MaintainProductDetailsComponent implements OnInit {
  currentProductDetail: ProductDetails = {
    productSKU: '',
    productName: '',
    productPrice: 0,
    status: false,
    createdBy: '',
    lastModifiedBy: '',
  };
  message = '';

  constructor(private productManagementService: ProductManagementService) {}

  ngOnInit(): void {
    this.message = '';
    this.productManagementService.updateProductDetailsObserver$.subscribe(
      (productDetails: ProductDetails) => {
        if (productDetails.id) {
          this.getProductDetail(productDetails.id.toString());
        }
      }
    );
  }

  getProductDetail(id: string): void {
    this.productManagementService.get(id).subscribe(
      (data) => {
        this.currentProductDetail = data;
      },
      (error) => {}
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      productSKU: this.currentProductDetail.productSKU,
      productName: this.currentProductDetail.productName,
      productPrice: this.currentProductDetail.productPrice,
      status: status,
    };

    this.message = '';

    this.productManagementService
      .update(this.currentProductDetail.id, data)
      .subscribe(
        (response) => {
          this.currentProductDetail.status = status;
          this.message = response.message
            ? response.message
            : PROCUCT_MANAGEMENT.MESSAGES.ACTIVATE_SUCCESS;
          this.showListPage(RedirectModes.RELOAD);
        },
        (error) => {}
      );
  }

  updateProductDetails(): void {
    this.message = '';

    this.productManagementService
      .update(this.currentProductDetail.id, this.currentProductDetail)
      .subscribe(
        (response) => {
          this.message = response.message
            ? response.message
            : PROCUCT_MANAGEMENT.MESSAGES.UPDATE_SUCCESS;
          this.showListPage(RedirectModes.RELOAD);
        },
        (error) => {}
      );
  }

  deleteProduct(): void {
    this.productManagementService
      .delete(this.currentProductDetail.id)
      .subscribe(
        (response) => {
          this.showListPage(RedirectModes.RELOAD);
        },
        (error) => {}
      );
  }

  showListPage(type: string): void {
    this.productManagementService.showListPageEmitter.next(type);
  }
}
