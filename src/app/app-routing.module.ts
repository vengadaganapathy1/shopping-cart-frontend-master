import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductDetailsComponent } from './components/add-product-details/add-product-details.component';
import { MaintainProductDetailsComponent } from './components/maintain-product-details/maintain-product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: MaintainProductDetailsComponent },
  { path: 'add', component: AddProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
