import { Component } from '@angular/core';

import { ProductManagementService } from 'src/app/services/productmanagement.service';
import { PROCUCT_MANAGEMENT, RedirectModes } from '../../constants/constant';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-import-product-details',
  templateUrl: './import-product-details.component.html',
  styleUrls: ['./import-product-details.component.scss'],
})
export class ImportProductDetailsComponent {
  constructor(
    private productManagementService: ProductManagementService,
    private papa: Papa
  ) {}

  importProductDetails(): void {
    this.test.forEach((product, index) => {
      const data = {
        productSKU: product.productsku,
        productName: product.productName,
        productPrice: product.productPrice,
        status: true,
        createdBy: PROCUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
        lastModifiedBy: PROCUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      };

      this.productManagementService.create(data).subscribe(
        (response) => {
          if (this.test.length - 1 === index) {
            this.showListPage(RedirectModes.RELOAD);
          }
        },
        (error) => {}
      );
    });
  }

  test: Array<any> = [];

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
            let productDetails: any = {
              productsku: results.data[i].ProductSKU,
              productName: results.data[i].ProductName,
              productPrice: results.data[i].ProductPrice,
              status: results.data[i].Status,
            } as any;
            this.test.push(productDetails);
          }
        },
      });
    };
  }

  showListPage(type: string): void {
    this.productManagementService.showListPageEmitter.next(type);
  }
}
