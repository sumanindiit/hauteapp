import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,
    private platform: Platform,
    ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
       if(localStorage.getItem('is_logged_in') == 'true'){
        //this.router.navigate(['/subscription']);
      }else{
        this.router.navigate(['/login']);
      } 
    });
  }
}