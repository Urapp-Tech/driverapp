

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  emailAddress: string = 'Vincent-bo@gmail.com'; // Replace with the actual email address
  @ViewChild('digit1Input', { static: false }) digit1Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit2Input', { static: false }) digit2Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit3Input', { static: false }) digit3Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit4Input', { static: false }) digit4Input!: ElementRef<HTMLInputElement>;

  verificationCode: {

    [key: string]: string;
    digit1: string;
    digit2: string;
    digit3: string;
    digit4: string;
  } = {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  };
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  async onKeyUp(event: KeyboardEvent, nextElement: any, prevElement: any, keyName:string) {
    //event.preventDefault();

    const input = event.target as HTMLInputElement;

    console.log('Key pressed:', event.key, input.value);


    if (event.key === 'Backspace') {
      //  prevElement.setFocus();
      if (input.value.length === 1) {
       // input.value = "";

      }
      else {
        prevElement.setFocus();
        // setTimeout(e => prevElement.setFocus(), 1)

      }
      return;
    }
    event.preventDefault();
    // let wait = await new Promise(resolve => setTimeout(resolve, 1000));
    // console.log(wait, "wait")
    if (event.target instanceof HTMLInputElement) {
      const input = event.target;

      console.log('Key pressed:', event.key, input.value);

      if (Number(event.key) >= 0 && Number(event.key) <= 9) {
        console.log('Key pressed is number between 0 and 9.');
        if (input.value.length === 1) {
          console.log('Input value length is 1. Focusing on next element');
          nextElement.setFocus();
        }
        console.log(input.attributes)
        //input.value = event.key
        this.verificationCode[keyName] = event.key;
        nextElement.setFocus();
      }
      else {
        console.log("key not number")
        if (input.value.length != 1) { this.verificationCode[keyName] = " "; }
        if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value) {
          // prevElement.setFocus();
        }
      }
    }
  }

  onKeyBackspace(event: KeyboardEvent, prevElement: any) {
    if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value) {
      prevElement.setFocus();
    }
  }

  onPaste(event: ClipboardEvent, element: any) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text/plain');

    if (pastedData && pastedData.length === 4) {
      this.verificationCode.digit1 = pastedData.charAt(0);
      this.verificationCode.digit2 = pastedData.charAt(1);
      this.verificationCode.digit3 = pastedData.charAt(2);
      this.verificationCode.digit4 = pastedData.charAt(3);
      element.nativeElement.setFocus();
    }
  }

  onKeyPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text/plain');
    if (pastedData && pastedData.length === 4) {
      this.verificationCode.digit1 = pastedData.charAt(0);
      this.verificationCode.digit2 = pastedData.charAt(1);
      this.verificationCode.digit3 = pastedData.charAt(2);
      this.verificationCode.digit4 = pastedData.charAt(3);
    }
  }

  onSubmit() {
    const code = `${this.verificationCode.digit1}${this.verificationCode.digit2}${this.verificationCode.digit3}${this.verificationCode.digit4}`;
    console.log(`${this.verificationCode.digit2}`, this.verificationCode.digit1, this.verificationCode);
    alert(code);
  }
}
