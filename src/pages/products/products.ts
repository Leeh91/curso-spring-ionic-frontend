import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService
    ) {
  }

  ionViewDidLoad() {

    let category_id = this.navParams.get('category_id');

    this.productService.findByCategory(category_id)
    .subscribe(response => {
      this.items = response['content'];
      this.loadImagesURL();
    }, error => {});

  }

  private loadImagesURL(){
    for(let i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageURL = `${API_CONFIG.bucketBaseURL}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

}
