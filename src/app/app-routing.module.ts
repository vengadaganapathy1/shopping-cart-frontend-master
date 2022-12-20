import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportProductDetailsComponent } from './components/import-product-details/import-product-details.component';
import { MaintainProductDetailsComponent } from './components/maintain-product-details/maintain-product-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductsListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'edit/:id', component: MaintainProductDetailsComponent },
  { path: 'add', component: MaintainProductDetailsComponent },
  { path: 'import', component: ImportProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
