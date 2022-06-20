/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { config } from '../config';
import { CommonService } from '../services/common.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logInForm: FormGroup;
  submitAttempt = false;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(
    public formBuilder: FormBuilder,
    private common: CommonService,
    public api: ApiService,
    public router: Router,
  ) {
    if (localStorage.getItem('is_logged_in') == 'true') {
      this.router.navigate(['/tabs-em/tabs-em/em-home']);
    }
  }

  get errorCtr() {
    return this.logInForm.controls;
  }

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([Validators.required])],
    });

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  onSubmit() {
    this.submitAttempt = true;
    if (!this.logInForm.valid) {
      return false;
    } else {
      this.common.presentLoading();
      const data = new FormData();
      data.append('username', this.logInForm.value.email);
      data.append('password', this.logInForm.value.password);

      this.api.post('jwt-auth/v1/token', data, '')
        .subscribe(
          (result) => {
            this.submitAttempt = false;
            this.common.stopLoading();
            const res: any = result;

            if (res.token != '') {
              localStorage.setItem('haute_userData', JSON.stringify(res.userData));
              localStorage.setItem('haute_userid', res.userId);
              localStorage.setItem('access_token', res.token);
              localStorage.setItem('haute_role', res.role);
              localStorage.setItem('is_logged_in', 'true');
              this.logInForm.reset();
              this.common.presentToast('Logged In Successfully!.', 'success');
              this.api.navCtrl.navigateRoot('/subscription');
            }
            else {
              this.common.presentToast('Something went wrong. Please try again.', 'danger');
            }
          },
          (error) => {
            this.submitAttempt = false;
            this.common.stopLoading();
            this.common.presentToast(error.error.message, 'danger');
            console.log(error);
          });
    }
  }
}
