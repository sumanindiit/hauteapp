import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userId: any = localStorage.getItem('haute_userid');
  userToken: any = localStorage.getItem('access_token');

  constructor(
    private common: CommonService,

  ) { }

  ngOnInit() {

  }

  async shareApp(feed: any) {
    await Share.share({
      title: 'Haute',
      text: 'Haute App',
      url: "https://play.google.com/store/apps/details?id=io.ionic.starter",
      dialogTitle: 'Share with..',
    }).then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing ::: ', error));
  }

  logout() {
    this.common.logout();
  }

}
