import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-em-all-jobs',
  templateUrl: './em-all-jobs.page.html',
  styleUrls: ['./em-all-jobs.page.scss'],
})
export class EmAllJobsPage implements OnInit {
  alljobs: any = [];
  userId: any = localStorage.getItem('haute_userid');
  userToken: any = localStorage.getItem('access_token');
  userRole: any = localStorage.getItem('haute_role');

  constructor(
    private common: CommonService,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.common.presentLoading();
    this.api.post('app/v1/fetch_all_jobs', { userRole: this.userToken }, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.alljobs = res;
          console.log(this.alljobs);
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
          this.common.stopLoading();
        });
  }

}
