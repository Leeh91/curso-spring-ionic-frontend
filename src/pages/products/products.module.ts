import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { ProductService } from '../../services/domain/product.service';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
  ],
  providers: [
    ProductService
  ]
})
export class ProductsPageModule {}
