import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public modalCtrll: ModalController
  ) { }

  showToolbar = false;

  onScroll($event) 
  {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  slideOpts = {
    slidesPerView: 1.1,
    speed: 400,
    spaceBetween: 5,
    };
  ngOnInit() {
  }
  closeModal() {
    this.modalCtrll.dismiss();
  }
}
