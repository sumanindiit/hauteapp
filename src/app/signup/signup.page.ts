import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { config } from '../config';
import { CommonService } from '../services/common.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;
  submitAttempt = false;
  passwordType = 'password';
  confirmPasswordType = 'password';
  passwordIcon = 'eye-off-outline';
  confirmPasswordIcon = 'eye-off-outline';


  defaultLink = '/tabs-em/tabs-em/em-home';
  customActionSheetOptions: any = {
    header: 'Choose One',
  };
  constructor(
    public formBuilder: FormBuilder,
    private common: CommonService,
    public api: ApiService,
    public router: Router,
  ) { }
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
      confirmPassword: ['', Validators.required],
      accountType: ['', [Validators.required]],
    }, {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }

  get errorCtr() {
    return this.signUpForm.controls;
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (signUpForm: FormGroup): {
      [key: string]: any;
    } => {
      const password = signUpForm.controls[passwordKey];
      const confirmPassword = signUpForm.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  hideShowConfirmPassword() {
    this.confirmPasswordType = this.confirmPasswordType === 'text' ? 'password' : 'text';
    this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  onChange($event: any) {
    console.log($event.detail.value);
    if ($event.detail.value === 'employee') {
      this.defaultLink = '/tabs-em/tabs-em/em-home';
    } else {
      this.defaultLink = '/tabs/tabs/home';
    }
  }

  onSubmit() {
    this.submitAttempt = true;
    if (!this.signUpForm.valid) {
      return false;
    } else {
       this.common.presentLoading();
      const data = new FormData();
      data.append("fname", this.signUpForm.value.firstName);
      data.append("lname", this.signUpForm.value.lastName);
      data.append("email", this.signUpForm.value.email);
      data.append("phoneNo", this.signUpForm.value.phoneNo);
      data.append("password", this.signUpForm.value.password);
      data.append("confPassword", this.signUpForm.value.confirmPassword);
      data.append("role", this.signUpForm.value.accountType);

      this.api.post('app/v1/register-user', data, '')
        .subscribe(
          (result) => {
            this.submitAttempt = false;
            this.common.stopLoading();
            const res: any = result;

            if (res.error == false) {
              localStorage.setItem('haute_userData', JSON.stringify(res.userData));
              localStorage.setItem('haute_userid', res.userData.ID);
              localStorage.setItem('access_token', res.token);
              localStorage.setItem('haute_role', res.role);
              localStorage.setItem('is_logged_in', 'true');
              this.signUpForm.reset();
              this.common.presentToast('Registered Successfully!.', 'success');
              this.api.navCtrl.navigateRoot('/subscription');
            }
            else {
              var errMsgs = '';
              for (var i = 0; i < res.errors.length; i++) {
                var obj = res.errors[i];
                errMsgs += obj + '</br>';
              }
              this.common.presentToast(errMsgs, 'danger');
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
