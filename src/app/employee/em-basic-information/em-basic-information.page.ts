import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalFooService } from '../../services/globalFooService.service';


@Component({
  selector: 'app-em-basic-information',
  templateUrl: './em-basic-information.page.html',
  styleUrls: ['./em-basic-information.page.scss'],
})
export class EmBasicInformationPage implements OnInit {
  facilityData: any = JSON.parse(localStorage.getItem('facility_type'));
  customFields: any = JSON.parse(localStorage.getItem('employee_custom_fields'));
  updateProfileForm: FormGroup;
  submitAttempt: boolean = false;
  userId: any = localStorage.getItem('haute_userid');
  userData: any;
  dict:any = [];

  constructor(
    public formBuilder: FormBuilder,
    private common: CommonService,
    public api: ApiService,
     private globalFooService: GlobalFooService,
  ) {

  }


  get errorCtr() {
    return this.updateProfileForm.controls;
  }

  checkDynamicErrors(fieldName) {
    return this.updateProfileForm.get(fieldName).hasError('required');
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('haute_userData'));
    this.updateProfileForm = this.formBuilder.group({
      firstName: [this.userData?.first_name, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      lastName: [this.userData?.last_name, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      pTitle: [this.userData?.professionaltitle, [Validators.required]],
      aboutMe: [this.userData?.about_me, [Validators.required]],
      facility: [this.userData?.facility.toString(), [Validators.required]],
      location: [this.userData?.location, [Validators.required]],
      email: [this.userData?.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNo: [this.userData?.phone_no, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.customFields.forEach(
      control => this.updateProfileForm.addControl(control.name, this.formBuilder.control(this.getControlValueFromUserData(control.name), [Validators.required]))
    );

  }

  getControlValueFromUserData(controlId) {
    return this.userData[controlId];
  }

  onSubmit() {
    this.submitAttempt = true;

    if (!this.updateProfileForm.valid) {
      console.log(this.updateProfileForm.controls.error);
      return false;
    } else {
      this.common.presentLoading();
      let dict = this.updateProfileForm.value;

      dict['userId'] = this.userId;

      const ProfileForm = new FormData();

      Object.keys(dict).forEach((key) => {
        ProfileForm.append(key, dict[key]);
      });


      this.api.post('app/v1/update_user_profile', ProfileForm, '')
        .subscribe(
          (result) => {
            this.submitAttempt = false;
            this.common.stopLoading();
            let res: any;
            res = result;
            console.log(res);
            if (res.status == 422) {
              this.common.presentToast(res.errors, 'danger');
            }
            else if (res.status == 200) {
              localStorage.setItem('haute_userData', JSON.stringify(res.userData));
              this.common.presentToast('Profile Updated Successfully!.', 'success');
            }
          },
          (error) => {
            console.log(error);
            this.common.stopLoading();
          });

    }
  }

  ionViewDidEnter() {}

}
