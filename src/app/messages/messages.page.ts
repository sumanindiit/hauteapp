import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  userId: any = localStorage.getItem('haute_userid');
  convertations: any = [];
  is_loaded: boolean = false;
  constructor(
    private common: CommonService,
    public api: ApiService,
  ) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.fetchConvertationList();
  }

  fetchConvertationList() {
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.api.post('app/v1/fetch_thread_between_users', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;

          if (res.status == 422 || res.status == '422') {
            this.common.presentToast(res.msg, 'danger');
          }
          else if (res.status == 200 || res.status == '200') {
            this.convertations = res.threads;
            if(res.threads.length == 0){
              this.is_loaded = true;
            }
            console.log(this.convertations);
          }
        },
        (error) => {
          this.common.presentToast(error.msg, 'danger');
          console.log(error);
          this.common.stopLoading();
        });
  }

}
