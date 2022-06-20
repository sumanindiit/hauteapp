import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ActionSheetController, IonContent } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { CommonService } from '../services/common.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild(IonContent) contentArea: IonContent;


  threadData: any = [];
  threadId: any;
  threadUser: any;
  userId: any = localStorage.getItem('haute_userid');
  messageForm: FormGroup;
  submitAttempt: boolean = false;
  disButton: boolean = true;

  previewImage: any;
  uploadBlobData: any;
  uploadedExtension: any;

  constructor(
    route: ActivatedRoute,
    private common: CommonService,
    public api: ApiService,
    private socket: Socket,
    public formBuilder: FormBuilder,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController,

  ) {
    this.threadId = route.snapshot.paramMap.get('threadId');
  }

  ionViewWillEnter() {
    this.getThreadData();
    this.socket.connect();
    this.socket.emit('send_message', { 'form_data': this.threadData });
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: ['', []],
    });
  }

  get errorCtr() {
    return this.messageForm.controls;
  }

  onSubmit() {
    this.submitAttempt = true;

    if (!this.messageForm.valid) {
      this.common.presentToast('Please enter your message.', 'danger');
      return false;
    } else {
      //this.common.presentLoading();
      const dict = this.messageForm.value;
      const imgName = (+new Date).toString(36).slice(-5);
      const formData = new FormData();
      
      if(typeof this.uploadBlobData === 'undefined' || this.uploadBlobData.size <= 0){ }else
      {
        formData.append('file', this.uploadBlobData, imgName+'.'+this.uploadedExtension);
      }
      formData.append('message', this.messageForm.value.message);
      formData.append('threadId', this.threadId);
      formData.append('userId', this.userId);

      this.socket.connect();
      this.socket.emit('send_message', { 'form_data': formData });

      this.api.post('app/v1/addMessageToThread', formData, '')
        .subscribe(
          (result) => {
            this.closeImg();
            console.log('in result');
            this.common.stopLoading();

            this.submitAttempt = false;
            const res: any = result;
            if (res.status === 422 || res.status === '422') {
              let errMsgs = '';
              for (const x of res.errors) {
                errMsgs += x + '</br>';
              }
              this.common.presentToast(errMsgs, 'danger');
            }
            else if (res.status === 200 || res.status === '200') {
              this.messageForm.reset();
              this.getThreadData();
            }
          },
          (error) => {
            this.common.stopLoading();
            console.log(error);
          });
    }
  }

  getThreadData() {
    //this.common.presentLoading();
    const formData = new FormData();
    
    formData.append('threadId', this.threadId);
    formData.append('userId', this.userId);
    this.api.post('app/v1/fetch_single_thread_between_users', formData, '')
      .subscribe(
        (result) => {

          this.previewImage = '';
          this.common.stopLoading();
          const res: any = result;
          if (res.status === 422 || res.status === '422') {
            this.common.presentToast(res.msg, 'danger');
          }
          else if (res.status === 200 || res.status === '200') {
            this.threadData = res.thread;
            this.threadUser = res.username;
            console.log(this.threadData);
          }
        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

  change(eve) {
    this.disButton = eve.target.value.length === '0' || eve.target.value.length === 0 ? true : false;
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

    this.previewImage = 'data:image/png;base64,' + image.base64String;

    this.uploadBlobData = blobData;
    
    this.uploadedExtension = image.format;

  }

  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
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

  closeImg(){
    this.previewImage = '';
    this.uploadBlobData = '';
    this.uploadedExtension = '';
  }

}
