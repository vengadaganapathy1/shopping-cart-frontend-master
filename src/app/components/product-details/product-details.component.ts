import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductDetails } from 'src/app/models/product-details.model';
import { PRODUCT_MANAGEMENT } from 'src/app/constants/constant';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  currentProductDetail: ProductDetails = {};
  productDetailSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productManagementService: ProductManagementService
  ) {}

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params[PRODUCT_MANAGEMENT.KEY_ID]);
  }

  getProduct(id: string): void {
    this.productDetailSubscription.add(
      this.productManagementService.get(id).subscribe(
        (data) => {
          this.currentProductDetail = data;
        },
        (error) => {}
      )
    );
  }

  showListPage(): void {
    this.router.navigate([PRODUCT_MANAGEMENT.LIST_ROUTE]);
  }

  editProduct(): void {
    this.router.navigate([
      `${PRODUCT_MANAGEMENT.EDIT_ROUTE}${this.currentProductDetail.id}`,
    ]);
  }

  ngOnDestroy(): void {
    this.productDetailSubscription.unsubscribe();
  }
}
