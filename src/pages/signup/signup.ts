import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      individualOrPartyDoc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      number: ['', [Validators.required]],
      addAddress: ['', []],
      neighborhood: ['', []],
      zipCode: ['', [Validators.required]],
      phone1: ['', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    console.log('Enviou o form');
  }

}
