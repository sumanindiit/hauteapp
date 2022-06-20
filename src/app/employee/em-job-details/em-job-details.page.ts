import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { GlobalFooService } from '../../services/globalFooService.service';
import { CommonService } from '../../services/common.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@capacitor/clipboard';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';



@Component({
  selector: 'app-em-job-details',
  templateUrl: './em-job-details.page.html',
  styleUrls: ['./em-job-details.page.scss'],
})
export class EmJobDetailsPage implements OnInit {
  jobData: any;
  userId: any = localStorage.getItem('haute_userid');
  relatedJobs: any = [];
  jobId: any;
  options: LaunchNavigatorOptions = {
    start: 'London, ON'
  }
  isApplied: boolean = false;
  isShortlisted: boolean = false;

  appliedTxt: any = 'Apply Now';
  Shortlistedtxt: any = 'Shortlist';

  constructor(
    route: ActivatedRoute,
    private globalFooService: GlobalFooService,
    private common: CommonService,
    public api: ApiService,
    private socialSharing: SocialSharing,
    private launchNavigator: LaunchNavigator) {
    this.jobId = route.snapshot.paramMap.get('jobId');
  }



  showToolbar = false;

  onScroll($event) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  shareWithWhatsapp(text, image, url) {
    this.socialSharing.shareViaWhatsApp(text, image, url).then((res) => {
      console.log('success......');
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  shareWithInstagram(text, image) {
    this.socialSharing.shareViaInstagram(text, image).then((res) => {
      console.log('success......');
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  shareWithFacebook(text, image, url) {
    this.socialSharing.shareViaFacebook(text, image, url).then((res) => {
      console.log('success......');
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  shareWithEmail(text, url) {
    this.socialSharing.canShareViaEmail().then((res) => {
      const body: any = 'Job Link:' + text + '<br/> (' + url + ')';
      this.socialSharing.shareViaEmail(body, '', ['']).then((res) => {
        console.log('success......');
        // Success
      }).catch((e) => {
        // Error!
      })
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  copyLink(url) {
    const writeToClipboard = async (url) => {
      await Clipboard.write({
        string: url
      });
    };
  }

  viewOnMap(viewlatlong) {
    console.log(viewlatlong);
    this.launchNavigator.navigate(viewlatlong, this.options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  ionViewWillEnter() {
    this.getJobData();
  }

  getJobData() {
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('jobId', this.jobId);
    formData.append('userId', this.userId);
    this.api.post('app/v1/getJobDetail', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          if (res.status === 422 || res.status === '422') {
            this.common.presentToast(res.errors, 'danger');
          }
          else if (res.status === 200 || res.status === '200') {
            this.jobData = res.detail;
            this.relatedJobs = res.related_posts;
            this.isApplied = res.isApplied;
            this.isShortlisted = res.is_shortlisted;
            console.log(this.jobData);
            console.log(this.relatedJobs);
          }
        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });

  }




  ngOnInit() {
  }

  applyForJob() {
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('jobId', this.jobId);
    formData.append('userId', this.userId);
    this.api.post('app/v1/applyForJob', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          if (res.status === 422 || res.status === '422') {
            this.common.presentToast(res.msg, 'danger');
          }
          else if (res.status === 200 || res.status === '200') {
            this.appliedTxt = res.msg;
            this.common.presentToast(res.succmsg, 'success');
          }
        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

  shortlistThisJob() {
    console.log('user click on the shortlisted button');
    this.common.presentLoading();
    const formData = new FormData();
    formData.append('jobId', this.jobId);
    formData.append('userId', this.userId);
    this.api.post('app/v1/addJobToFav', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          if (res.status === 422 || res.status === '422') {
            this.common.presentToast(res.msg, 'danger');
          }
          else if (res.status === 200 || res.status === '200') {
            this.Shortlistedtxt = res.msg;
            this.common.presentToast(res.succmsg, 'success');
          }
        },
        (error) => {
          this.common.stopLoading();
          console.log(error);
        });
  }

}
