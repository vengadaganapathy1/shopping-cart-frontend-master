import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductDetails } from 'src/app/models/product-details.model';
import { SearchType } from 'src/app/models/search-type.model';
import { PRODUCT_MANAGEMENT, SearchModes } from '../../constants/constant';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private productManagementService: ProductManagementService
  ) {}
  baseUrl = PRODUCT_MANAGEMENT.API_URL;
  productDetails?: ProductDetails[];
  currentIndex = -1;
  title = '';
  mode = '';
  currentProductDetail: ProductDetails = {};
  searchOptions: Array<SearchType> = [
    {
      keyField: 'productName',
      displayField: 'Product Name',
      placeHolder: 'Search by product name',
      searchUrl: '?productName=',
    },
    {
      keyField: 'productSKU',
      displayField: 'Product SKU',
      placeHolder: 'Search by product SKU',
      searchUrl: '/sku?productSKU=',
    },
  ];
  selectedValue = '';
  selectedSearchOption: SearchType = this.searchOptions[0];
  placeholderText = this.selectedSearchOption.placeHolder;
  productListSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    // this.productListSubscription.add(
    //   this.productManagementService.showListPageObserver$.subscribe(
    //     (type: string) => this.showListPage(type)
    //   )
    // );
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

  retrieveProductDetails(): void {
    this.productListSubscription.add(
      this.productManagementService.getAll().subscribe(
        (data) => {
          this.productDetails = data;
        },
        (error) => {}
      )
    );
  }

  addNewProduct(): void {
    this.currentProductDetail = {};
    this.router.navigate([PRODUCT_MANAGEMENT.ADD_ROUTE]);
    // this.productManagementService.updateProductDetailsEmitter.next(
    //   this.currentProductDetail
    // );
  }

  showImportPage(): void {
    this.router.navigate([PRODUCT_MANAGEMENT.IMPORT_ROUTE]);
  }

  refreshList(): void {
    this.retrieveProductDetails();
    this.currentProductDetail = {};
    this.currentIndex = -1;
  }

  setActiveProduct(productDetail: ProductDetails, index: number): void {
    this.currentProductDetail = productDetail;
    this.currentIndex = index;
    this.router.navigate([
      `${PRODUCT_MANAGEMENT.DETAILS_ROUTE}${this.currentProductDetail.id}`,
    ]);
  }

  removeAllProductDetails(): void {
    this.productListSubscription.add(
      this.productManagementService.deleteAll().subscribe(
        () => {
          this.refreshList();
        },
        (error) => {}
      )
    );
  }

  searchProduct(searchMode: string): void {
    this.currentProductDetail = {};
    this.currentIndex = -1;
    this.mode = '';
    let url = this.getFetchUrl(searchMode);
    this.productListSubscription.add(
      this.productManagementService.findByProductDetails(url).subscribe(
        (data) => {
          this.productDetails = data;
        },
        (error) => {}
      )
    );
  }

  resetSearchProduct(): void {
    this.resetSearchControls();
    this.searchProduct(SearchModes.SEARCH);
  }

  showActiveRecords(): void {
    this.resetSearchControls();
    this.searchProduct(SearchModes.ACTIVE);
  }

  showInActiveRecords(): void {
    this.resetSearchControls();
    this.searchProduct(SearchModes.INACTIVE);
  }

  getFetchUrl(searchMode: string): string {
    let url = '';
    if (searchMode === SearchModes.SEARCH) {
      url = `${this.baseUrl}${this.selectedSearchOption.searchUrl}${this.title}`;
    } else {
      url = `${this.baseUrl}/${searchMode}`;
    }
    return url;
  }

  resetSearchControls(): void {
    this.title = '';
    this.selectedSearchOption = this.searchOptions[0];
    this.placeholderText = this.selectedSearchOption.placeHolder;
  }

  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }
}
