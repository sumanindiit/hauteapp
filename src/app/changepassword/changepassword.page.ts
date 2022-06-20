import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../services/api/api.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  userId: any = localStorage.getItem('haute_userid');
  updatePasswordForm: FormGroup;
  submitPasswordAttempt: boolean = false;

  passwordType: string = 'password';
  confirmPasswordType: string = 'password';
  passwordIcon: string = 'eye-off';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    public formBuilder: FormBuilder,
    private common: CommonService,
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }


  get errorPasswordCtr() {
    return this.updatePasswordForm.controls;
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (updatePasswordForm: FormGroup): {
      [key: string]: any
    } => {
      let password = updatePasswordForm.controls[passwordKey];
      let confirmPassword = updatePasswordForm.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  onPasswordSubmit() {
    this.submitPasswordAttempt = true;

    if (!this.updatePasswordForm.valid) {
      return false;
    } else {
      this.common.presentLoading();
      let dict = this.updatePasswordForm.value;
      dict['userId'] = this.userId;

      const updatePwdForm = new FormData();

      Object.keys(dict).forEach((key) => {
        updatePwdForm.append(key, dict[key]);
      });

      this.api.post('app/v1/updatePassword', updatePwdForm, '')
        .subscribe(
          (result) => {
            this.submitPasswordAttempt = false;
            this.common.stopLoading();
            let res: any;
            res = result;
            if (res.status == 422) {
              this.common.presentToast(res.errors, 'danger');
            }
            else if (res.status == 200) {
              localStorage.clear();
              this.router.navigate(['/login']);
              this.common.presentToast('Password Updated Successfully!. Please Log in.', 'success');
            }
          },
          (error) => {
            console.log(error);
          });
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowConfirmPassword() {
    this.confirmPasswordType = this.confirmPasswordType === 'text' ? 'password' : 'text';
    this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


}
