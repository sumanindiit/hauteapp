import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPassword: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) { }

  get errorCtr() {
    return this.forgotPassword.controls;
  }

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  onSubmit() {
    if (!this.forgotPassword.valid) {
        return false;
    } else {
      const dict = this.forgotPassword.value;
    }
  }


}
