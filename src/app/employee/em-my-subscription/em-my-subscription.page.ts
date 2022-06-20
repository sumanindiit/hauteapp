import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { GlobalFooService } from '../../services/globalFooService.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-em-my-subscription',
  templateUrl: './em-my-subscription.page.html',
  styleUrls: ['./em-my-subscription.page.scss'],
})
export class EmMySubscriptionPage implements OnInit {
  userData: any;
  userToken: any = localStorage.getItem('access_token');
  userId: any = localStorage.getItem('haute_userid');
  subscriptionData: any;

  slideOpts = {
    slidesPerView: 1.2,
    speed: 400,
    loop: true,
    spaceBetween: 0,
    centeredSlides: true,
    effect: 'coverflow',
    initialSlide: 1,

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
    this.getCurrentSubscription();
  }

  getCurrentSubscription() {
    const formData = new FormData();
    formData.append('userId', this.userId);
    this.common.presentLoading();
    this.api.post('app/v1/getPurchasedSubscriptions', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.subscriptionData = res.packages;
          console.log(this.subscriptionData);

        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

}
