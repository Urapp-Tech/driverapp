import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  resetEmail: string = '';

  onGetCode() {
    this.router.navigate(['/otp'], { replaceUrl: false, state: {email: this.resetEmail} });

  }
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
