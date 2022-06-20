import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { GlobalFooService } from '../../services/globalFooService.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileDownload } from "capacitor-plugin-filedownload";
const { FileSelector } = Plugins;
import 'capacitor-file-selector' // Comment out this line when building android/iOS app


@Component({
  selector: 'app-em-resume',
  templateUrl: './em-resume.page.html',
  styleUrls: ['./em-resume.page.scss'],
})
export class EmResumePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  userData: any;
  userToken: any = localStorage.getItem('access_token');
  userId: any = localStorage.getItem('haute_userid');
  previewImage: any;
  uploadBlobData: any;
  uploadedExtension: any;
  userImage: any;

  resumeData: any;
  resumeMessage: any;
  resumeUploaded: boolean = false;

  constructor(
    private globalFooService: GlobalFooService,
    private common: CommonService,
    public api: ApiService,
    public router: Router,
    public plt: Platform,
    public actionSheetCtrl: ActionSheetController,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userData = JSON.parse(localStorage.getItem('haute_userData'));
    this.userImage = this.userData.image;
    this.getCurrentResumes();
  }

  viewResume(filePath, fileExt) {
    this.fileOpener.showOpenWithDialog(filePath, fileExt)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  }

  getCurrentResumes() {
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.common.presentLoading();
    this.api.post('app/v1/fetch_user_current_resume', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.resumeData = res.data;
          this.resumeMessage = res.message;
          this.resumeUploaded = res.uploaded;

        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

  deleteResume(attachId) {
    const formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('attach_id', attachId);
    this.common.presentLoading();
    this.api.post('app/v1/deleteResume', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;

          if (res.status == 422) {
            this.common.presentToast(res.errors, 'danger');
          }
          else if (res.status == 200) {
            this.common.presentToast('Resume deleted successfully!.', 'success');
            this.getCurrentResumes();
          }

        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

  downloadResume(filePath, fileName) {
    console.log(filePath);
    FileDownload.download({
      uri: filePath,
      fileName: fileName
    }).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  async select() {
    let multiple_selection = false;
    let ext = ["pdf"]
    ext = ext.map(v => v.toLowerCase());
    let formData = new FormData();
    let selectedFile = await FileSelector.fileSelector({
      multiple_selection: multiple_selection,
      ext: ext
    })



    console.log(this.plt);

    if (!this.plt.is('hybrid')) {
      FileSelector.addListener("onFilesSelected", (data: FileList) => {

        for (var i = 0; i < data.length; i++) {
           console.log(data.item(i));
          formData.append(
            "candidate_cv_file",
            data.item(i),
            data.item(i).name
          );
        }
        formData.append('userId', this.userId);
        this.addResumeToUserProfile(formData);


      });
    }

    if (this.plt.is("android")) {
      let paths = JSON.parse(selectedFile.paths)
      let original_names = JSON.parse(selectedFile.original_names)
      let extensions = JSON.parse(selectedFile.extensions)
      for (let index = 0; index < paths.length; index++) {
        const file = await fetch(paths[index]).then((r) => r.blob());

        formData.append('candidate_cv_file', file, original_names[index]);
        formData.append('userId', this.userId);
        this.addResumeToUserProfile(formData);
      }
    }
    else if (this.plt.is("ios")) {
      for (let index = 0; index < selectedFile.paths.length; index++) {

        const file = await fetch(selectedFile.paths[index]).then((r) => r.blob());

        formData.append('candidate_cv_file', file, selectedFile.original_names[index]);
        formData.append('userId', this.userId);
        this.addResumeToUserProfile(formData);

      }
    }
    else {
      FileSelector.addListener("onFilesSelected", (data: FileList) => {
        for (var i = 0; i < data.length; i++) {
          formData.append(
            "candidate_cv_file",
            data.item(i),
            data.item(i).name
          );
        }
        formData.append('userId', this.userId);
        this.addResumeToUserProfile(formData);


      });
    }


  }


  addResumeToUserProfile(formData) {
    this.common.presentLoading();
    this.api.post('app/v1/addEmployeeResume', formData, '')
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
            this.getCurrentResumes();
            this.common.presentToast('Resume added successfully!.', 'success');
          }
        },
        (error) => {
          console.log(error);
          this.common.stopLoading();
        });
    this.common.stopLoading();
  }

}
