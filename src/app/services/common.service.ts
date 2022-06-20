import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading: any;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    public plt: Platform,
    public router: Router,
  ) { }




  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      mode: "ios"
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      mode: "ios"
    });
    await this.loading.present();
  }

  async stopLoading() {
    if (this.loading != undefined) {
      await this.loading.dismiss();
    }
    else {
      var self = this;
      setTimeout(function () {
        self.stopLoading();
      }, 1000);
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  async redirectToLogin() {
    await this.plt.ready().then(() => {
      if (localStorage.getItem('is_logged_in') != 'true') {
        this.router.navigate(['/login']);
      }
    });
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }




}
