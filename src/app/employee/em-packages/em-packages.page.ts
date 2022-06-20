import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { GlobalFooService } from '../../services/globalFooService.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-em-packages',
  templateUrl: './em-packages.page.html',
  styleUrls: ['./em-packages.page.scss'],
})
export class EmPackagesPage implements OnInit {
  userData: any;
  userToken: any = localStorage.getItem('access_token');
  userId: any = localStorage.getItem('haute_userid');
  subscriptionData: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: 25,
    slidesPerView: 1,
  };

  constructor(
    private globalFooService: GlobalFooService,
    private common: CommonService,
    public api: ApiService
  ) { }

  showToolbar = false;

  onScroll($event) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userData = JSON.parse(localStorage.getItem('haute_userData'));
    this.getSubscriptions();
  }

  getSubscriptions() {
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.common.presentLoading();
    this.api.post('app/v1/getUserSubscriptions', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.subscriptionData = res;
          console.log(this.subscriptionData);

        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

}
