import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';
import { ProductsGuard } from './products.guard';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductsGuard], 
        component: ProductDetailComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }
