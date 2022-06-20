import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { GlobalFooService } from '../../services/globalFooService.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-em-profile',
  templateUrl: './em-profile.page.html',
  styleUrls: ['./em-profile.page.scss'],
})
export class EmProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  userData: any;
  userToken: any = localStorage.getItem('access_token');
  userId: any = localStorage.getItem('haute_userid');
  previewImage: any;
  uploadBlobData: any;
  uploadedExtension: any;
  userImage: any;

  constructor(
    private globalFooService: GlobalFooService,
    private common: CommonService,
    public api: ApiService,
    public router: Router,
    public plt: Platform,
    public actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.userData = JSON.parse(localStorage.getItem('haute_userData'));
    this.userImage = this.userData.image;
    this.getFilters();
  }

  getFilters() {
    this.common.presentLoading();
    this.api.post('app/v1/fetch_user_basic_options', { userRole: this.userToken }, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          localStorage.setItem('facility_type', JSON.stringify(res.facilityType));
          localStorage.setItem('employee_custom_fields', JSON.stringify(res.candCustomFields));
        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Gallery',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: any) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });


    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'imagee';

    this.userImage = 'data:image/png;base64,' + image.base64String;

    this.uploadBlobData = blobData;
    this.uploadedExtension = image.format;

    const formData = new FormData();

    if (typeof this.uploadBlobData === 'undefined') { } else {
      formData.append('file', this.uploadBlobData, 'myimage.' + this.uploadedExtension);
      formData.append('userId',this.userId);
      this.common.presentLoading();
      this.api.post('app/v1/updateProfileImage', formData, '')
        .subscribe(
          (result) => {
            this.common.stopLoading();
            let res: any;
            res = result;
            console.log(res);
            if (res.status == 422) {
              this.common.presentToast(res.errors, 'danger');
            }
            else if (res.status == 200) {
              localStorage.setItem('haute_userData', JSON.stringify(res.userData));
              this.common.presentToast('Profile image updated successfully!.', 'success');
            }
          },
          (error) => {
            console.log(error);
            this.common.stopLoading();
          });
    }



  }

  // Helper function
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



}
