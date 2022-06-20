import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-em-notifications',
  templateUrl: './em-notifications.page.html',
  styleUrls: ['./em-notifications.page.scss'],
})
export class EmNotificationsPage implements OnInit {
  userId: any = localStorage.getItem('haute_userid');
  allNotifications: any = [];
  is_loaded: boolean = false;
  constructor(
    private common: CommonService,
    public api: ApiService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.api.post('app/v1/fetchUserNotifications', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;

          if (res.status == 422 || res.status == '422') {
            this.common.presentToast(res.errors, 'danger');
          }
          else if (res.status == 200 || res.status == '200') {
            this.allNotifications = res.notifications;
            console.log(res.notifications.length);
            if(res.notifications.length == 0){
              this.is_loaded = true;
            }
            console.log(this.is_loaded);
            console.log(this.allNotifications);
          }
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
          this.common.stopLoading();
        });
  }

}
