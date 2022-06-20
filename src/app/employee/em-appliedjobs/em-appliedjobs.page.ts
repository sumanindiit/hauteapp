import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-em-appliedjobs',
  templateUrl: './em-appliedjobs.page.html',
  styleUrls: ['./em-appliedjobs.page.scss'],
})
export class EmAppliedjobsPage implements OnInit {
  userId: any = localStorage.getItem('haute_userid');
  alljobs: any = [];

  constructor(
    private common: CommonService,
    public api: ApiService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.fetchActiveJobs();
  }

  fetchActiveJobs(){
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.api.post('app/v1/fetchUserActiveJobs', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.alljobs = res.jobs;
          console.log(this.alljobs);
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
          this.common.stopLoading();
        });
  }

  

}
