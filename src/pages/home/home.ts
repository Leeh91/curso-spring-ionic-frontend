import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: CredentialsDTO = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public authService: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.authService.refreshToken()
    .subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {
    })
  }

  login(){
    this.authService.authenticate(this.credentials)
    .subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {
    })
  }

}
