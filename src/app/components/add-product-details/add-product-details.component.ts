import { Component, OnInit } from '@angular/core';
import { PROCUCT_MANAGEMENT } from 'src/app/constants/constant';
import { ProductDetails } from 'src/app/models/product-details.model';
import { RedirectModes } from '../../constants/constant';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss'],
})
export class AddProductDetailsComponent implements OnInit {
  product: ProductDetails = {
    productSKU: '',
    productName: '',
    productPrice: 0,
    status: false,
    createdBy: '',
    lastModifiedBy: '',
  };
  submitted = false;

  constructor(private productManagementService: ProductManagementService) {}

  ngOnInit(): void {}

  saveNewProduct(): void {
    const data = {
      productSKU: this.product.productSKU,
      productName: this.product.productName,
      productPrice: this.product.productPrice,
      status: true,
      createdBy: PROCUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      lastModifiedBy: PROCUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.productManagementService.create(data).subscribe(
      (response) => {
        this.submitted = true;
        this.showListPage(RedirectModes.RELOAD);
      },
      (error) => {}
    );
  }

  addNewProduct(): void {
    this.submitted = false;
    this.product = {
      productSKU: '',
      productName: '',
      productPrice: 0,
      status: false,
    };
  }

  showListPage(type: string): void {
    this.productManagementService.showListPageEmitter.next(type);
  }
}
