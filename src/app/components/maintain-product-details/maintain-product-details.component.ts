import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { PRODUCT_MANAGEMENT } from 'src/app/constants/constant';
import { ProductDetails } from 'src/app/models/product-details.model';
import { ProductManagementService } from 'src/app/services/productmanagement.service';

@Component({
  selector: 'app-maintain-product-details',
  templateUrl: './maintain-product-details.component.html',
  styleUrls: ['./maintain-product-details.component.scss'],
})
export class MaintainProductDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  mode = PRODUCT_MANAGEMENT.KEY_NEW;
  currentProductDetail: ProductDetails = {
    productSKU: '',
    productName: '',
    productPrice: 0,
    status: false,
    createdBy: '',
    lastModifiedBy: '',
  };
  productId = 0;
  title = PRODUCT_MANAGEMENT.ADD_PRODUCT_TITLE;
  buttonText = PRODUCT_MANAGEMENT.KEY_SAVE;
  maintainProductSubscription: Subscription = new Subscription();

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productManagementService: ProductManagementService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.productId = this.route.snapshot.params[PRODUCT_MANAGEMENT.KEY_ID];
    if (this.productId) {
      this.mode = PRODUCT_MANAGEMENT.KEY_EDIT;
      this.title = PRODUCT_MANAGEMENT.EDIT_PRODUCT_TITLE;
      this.buttonText = PRODUCT_MANAGEMENT.KEY_UPDATE;
      this.getProductDetail(this.productId.toString());
    } else {
      this.mode = PRODUCT_MANAGEMENT.KEY_NEW;
      this.buttonText = PRODUCT_MANAGEMENT.KEY_SAVE;
      this.title = PRODUCT_MANAGEMENT.ADD_PRODUCT_TITLE;
    }
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      productSKU: ['', [Validators.required, Validators.minLength(8)]],
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      productPrice: ['', [Validators.required]],
    });
  }

  get formCtrl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getProductDetail(id: string): void {
    this.maintainProductSubscription.add(
      this.productManagementService.get(id).subscribe(
        (data) => {
          this.currentProductDetail = data;
          this.form.patchValue({
            productSKU: this.currentProductDetail.productSKU,
            productName: this.currentProductDetail.productName,
            productPrice: this.currentProductDetail.productPrice,
          });
        },
        (error) => {}
      )
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastr.warning(
        PRODUCT_MANAGEMENT.MESSAGES.INVALID_FORM,
        PRODUCT_MANAGEMENT.WARNING
      );
      return;
    }
    if (this.mode === PRODUCT_MANAGEMENT.KEY_NEW) {
      this.saveProductDetails();
    } else if (this.mode === PRODUCT_MANAGEMENT.KEY_EDIT) {
      this.updateProductDetails();
    }
  }

  saveProductDetails(): void {
    const data = {
      productSKU: this.form.value.productSKU,
      productName: this.form.value.productName,
      productPrice: this.form.value.productPrice,
      status: true,
      createdBy: PRODUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      lastModifiedBy: PRODUCT_MANAGEMENT.USER_DETAILS.USER_NAME,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.maintainProductSubscription.add(
      this.productManagementService.create(data).subscribe(
        (response) => {
          this.submitted = true;
          this.showListPage(
            PRODUCT_MANAGEMENT.MESSAGES.SAVE_SUCCESS,
            response[PRODUCT_MANAGEMENT.KEY_ID]
          );
        },
        (error) => {}
      )
    );
  }

  updateProductDetails(): void {
    this.currentProductDetail.productSKU = this.form.value.productSKU;
    this.currentProductDetail.productName = this.form.value.productName;
    this.currentProductDetail.productPrice = this.form.value.productPrice;
    this.maintainProductSubscription.add(
      this.productManagementService
        .update(this.currentProductDetail.id, this.currentProductDetail)
        .subscribe(
          (response) => {
            this.showListPage(
              PRODUCT_MANAGEMENT.MESSAGES.UPDATE_SUCCESS,
              this.currentProductDetail.id.toString()
            );
          },
          (error) => {}
        )
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  updatePublished(status: boolean): void {
    this.currentProductDetail.status = status;
    this.maintainProductSubscription.add(
      this.productManagementService
        .update(this.currentProductDetail.id, this.currentProductDetail)
        .subscribe(
          (response) => {
            this.showListPage(
              PRODUCT_MANAGEMENT.MESSAGES.ACTIVATE_SUCCESS,
              this.currentProductDetail.id.toString()
            );
          },
          (error) => {}
        )
    );
  }

  deleteProduct(): void {
    this.maintainProductSubscription.add(
      this.productManagementService
        .delete(this.currentProductDetail.id)
        .subscribe(
          (response) => {
            this.showListPage(PRODUCT_MANAGEMENT.MESSAGES.DELETE_SUCCESS);
          },
          (error) => {}
        )
    );
  }

  showListPage(message: string, id?: string): void {
    if (id) {
      this.router.navigate([`${PRODUCT_MANAGEMENT.LIST_ROUTE}/${id}`]);
    } else {
      this.router.navigate([`${PRODUCT_MANAGEMENT.LIST_ROUTE}`]);
    }
    if (message) {
      this.toastr.success(message, PRODUCT_MANAGEMENT.SUCCESS);
    }
  }

  // Only Numbers with Decimals
  keyPressNumbersDecimal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Only AlphaNumeric
  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ngOnDestroy(): void {
    this.maintainProductSubscription.unsubscribe();
  }
}
