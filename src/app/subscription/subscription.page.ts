import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  packages: any;
  userId: any = localStorage.getItem('haute_userid');
  userToken: any = localStorage.getItem('access_token');
  userRole: any = localStorage.getItem('haute_role');

  constructor(
    private common: CommonService,
    public api: ApiService,
  ) { }

  showToolbar = false;

  onScroll($event) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  slideOpts = {
    slidesPerView: 1.2,
    speed: 400,
    loop: true,
    spaceBetween: 0,
    centeredSlides: true,
    effect: 'coverflow',
    initialSlide: 1,

  };
  ngOnInit() {
    this.getSubscriptions();
  }

  getSubscriptions() {
    this.api.post('app/v1/getUserSubscriptions', { userRole: this.userToken }, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.packages = res;
          console.log(this.packages);
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
        });
  }

  goToDashboard() {
    this.api.navCtrl.navigateRoot('/tabs-em/tabs-em/em-home');
  }

}
