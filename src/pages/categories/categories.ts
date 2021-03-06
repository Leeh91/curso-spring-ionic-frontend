import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/domain/category.service';
import { CategoryDTO } from '../../models/Category.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: CategoryDTO[];
  bucketURL: string = API_CONFIG.bucketBaseURL;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {

    this.categoryService.findAll()
    .subscribe(response => {
      this.items = response;
    }, error => {})
    console.log('ionViewDidLoad CategoriesPage');
  }

  showProducts(category_id: string){
     this.navCtrl.push('ProductsPage', {category_id: category_id});
  }

}
