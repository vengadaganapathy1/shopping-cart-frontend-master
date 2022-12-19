import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductDetails } from 'src/app/models/product-details.model';
import { RedirectModes } from '../../constants/constant';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private productManagementService: ProductManagementService) {}
  productDetails?: ProductDetails[];
  currentIndex = -1;
  title = '';
  mode = '';
  currentProductDetail: ProductDetails = {};
  searchOptions = [
    {
      keyField: 'productName',
      displayField: 'Product Name',
      placeHolder: 'Search by product name',
    },
    {
      keyField: 'productSKU',
      displayField: 'Product SKU',
      placeHolder: 'Search by product SKU',
    },
  ];
  selectedValue = '';
  selectedSearchOption: {
    keyField: string;
    displayField: string;
    placeHolder: string;
  } = this.searchOptions[0];
  placeholderText = this.selectedSearchOption.placeHolder;

  ngOnInit(): void {
    this.productManagementService.showListPageObserver$.subscribe(
      (type: string) => this.showListPage(type)
    );
    this.retrieveProductDetails();
  }

  onChange(event: any): void {
    this.selectedValue = event.target.value;
    const getOption = this.searchOptions.find((element) => {
      return element.keyField === this.selectedValue;
    });
    this.selectedSearchOption = getOption
      ? getOption
      : this.selectedSearchOption;
    this.placeholderText = this.selectedSearchOption
      ? this.selectedSearchOption.placeHolder
      : this.placeholderText;
  }

  showListPage(type: string): void {
    {
      if (type === RedirectModes.RELOAD) {
        this.mode = '';
        this.refreshList();
      } else if (type === RedirectModes.CANCEL) {
        this.mode = '';
      } else if (type === RedirectModes.UPDATE) {
        this.mode = type;
        this.productManagementService.updateProductDetailsEmitter.next(
          this.currentProductDetail
        );
      }
    }
  }

  retrieveProductDetails(): void {
    this.productManagementService.getAll().subscribe(
      (data) => {
        this.productDetails = data;
      },
      (error) => {}
    );
  }

  addNewProduct(): void {
    this.mode = RedirectModes.ADD;
  }

  showDetailsPage(): void {
    this.mode = RedirectModes.DETALIS;
  }

  showImportPage(): void {
    this.mode = RedirectModes.IMPORT;
  }

  refreshList(): void {
    this.retrieveProductDetails();
    this.currentProductDetail = {};
    this.currentIndex = -1;
  }

  setActiveProduct(productDetail: ProductDetails, index: number): void {
    this.currentProductDetail = productDetail;
    this.productManagementService.showProductDetailsEmitter.next(productDetail);
    this.currentIndex = index;
    this.mode = 'details';
  }

  removeAllProductDetails(): void {
    this.productManagementService.deleteAll().subscribe(
      () => {
        this.refreshList();
      },
      (error) => {}
    );
  }

  searchProduct(searchMode: string): void {
    this.currentProductDetail = {};
    this.currentIndex = -1;
    this.mode = '';
    let url = this.getFetchUrl(searchMode);
    this.productManagementService.findByProductDetails(url).subscribe(
      (data) => {
        this.productDetails = data;
      },
      (error) => {}
    );
  }

  resetSearchProduct(): void {
    this.resetSearchControls();
    this.searchProduct('search');
  }

  showActiveRecords(): void {
    this.resetSearchControls();
    this.searchProduct('active');
  }

  showInActiveRecords(): void {
    this.resetSearchControls();
    this.searchProduct('inactive');
  }

  getFetchUrl(searchMode: string): string {
    let url;
    if (searchMode === 'search') {
      url =
        this.selectedSearchOption.keyField === 'productName'
          ? `?productName=${this.title}`
          : `/sku?productSKU=${this.title}`;
    } else {
      url = `/${searchMode}`;
    }
    return url;
  }

  resetSearchControls(): void {
    this.title = '';
    this.selectedSearchOption = this.searchOptions[0];
    this.placeholderText = this.selectedSearchOption.placeHolder;
  }
}
