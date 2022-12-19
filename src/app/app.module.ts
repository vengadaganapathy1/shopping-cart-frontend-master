import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddProductDetailsComponent } from './components/add-product-details/add-product-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MaintainProductDetailsComponent } from './components/maintain-product-details/maintain-product-details.component';
import { ImportProductDetailsComponent } from './components/import-product-details/import-product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductDetailsComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    MaintainProductDetailsComponent,
    ImportProductDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
