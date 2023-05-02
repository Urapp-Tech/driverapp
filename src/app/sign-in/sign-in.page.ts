import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor() { }
   passType="password";
   eyeIcon="eye-off"
  ngOnInit() {
  }
  onEyeClick()
  {
    this.passType=(this.passType!="password") ? "password":"text";
    this.eyeIcon = (this.eyeIcon !="eye") ? "eye":"eye-off";
  }
  forgot(){
    console.log('Forgot');
  }
}
