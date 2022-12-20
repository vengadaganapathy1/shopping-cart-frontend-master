import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Papa } from 'ngx-papaparse';
import { ToastrService } from 'ngx-toastr';

import { ProductManagementService } from 'src/app/services/productmanagement.service';
import { PRODUCT_MANAGEMENT } from '../../constants/constant';
import { ProductDetails } from 'src/app/models/product-details.model';

@Component({
  selector: 'app-import-product-details',
  templateUrl: './import-product-details.component.html',
  styleUrls: ['./import-product-details.component.scss'],
})
export class ImportProductDetailsComponent {
  constructor(
    private router: Router,
    private productManagementService: ProductManagementService,
    private papa: Papa,
    private toastr: ToastrService
  ) {}

  importProductDetails(): void {
    this.importedRows.forEach((product, index) => {
      const data = {
        productSKU: product.productSKU,
        productName: product.productName,
        productPrice: product.productPrice,
        status: true,
        createdBy: PRODUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
        lastModifiedBy: PRODUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      };

      this.productManagementService.create(data).subscribe(
        (response) => {
          if (this.importedRows.length - 1 === index) {
            this.showListPage();
          }
        },
        (error) => {}
      );
    });
  }

  importedRows: Array<ProductDetails> = [];

  handleFileSelect(evt: any) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results: any) => {
          for (let i = 0; i < results.data.length; i++) {
            let productDetails: ProductDetails = {
              productSKU: results.data[i].ProductSKU,
              productName: results.data[i].ProductName,
              productPrice: results.data[i].ProductPrice,
              status: results.data[i].Status,
            } as ProductDetails;
            this.importedRows.push(productDetails);
          }
        },
      });
    };
  }

  showListPage(): void {
    this.router.navigate([PRODUCT_MANAGEMENT.LIST_ROUTE]);
    this.toastr.success(
      PRODUCT_MANAGEMENT.MESSAGES.IMPORT_SUCCESS,
      PRODUCT_MANAGEMENT.SUCCESS
    );
  }
}
