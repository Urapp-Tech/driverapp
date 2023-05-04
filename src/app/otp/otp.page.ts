

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  emailAddress: string = 'Vincent-bo@gmail.com'; // Replace with the actual email address
  otp!: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'background': 'none',
      'border': '2px lightgrey solid',
      'border-radius': '8px',
      'font-size': '26px',
      'font-weight': '600',
    }
  };
  constructor(router: Router) {
    let currentNav = router.getCurrentNavigation()
    console.log(currentNav, "current")
    if (currentNav !== null) {
      let email = currentNav.extras.state?.['email'];
      if (email)
        this.emailAddress = currentNav.extras.state?.['email'];
    }
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit() {
    const code = this.otp;
    console.log(code);
    if (code)
      alert(code);
  }
}
