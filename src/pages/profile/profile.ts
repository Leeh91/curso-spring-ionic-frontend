import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CustomerDTO } from '../../models/customer.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  customer: CustomerDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public customerService: CustomerService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();

    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
      .subscribe(response => {
        this.customer = response;
        this.getImageIfExists();
      }, error => {});
    }
  }

  getImageIfExists(){
    this.customerService.getImageFromBucket(this.customer.id)
    .subscribe(response => {
      this.customer.imageURL = `${API_CONFIG.bucketBaseURL}/cp${this.customer.id}.jpg`;
    }, error => {});
  }

}
