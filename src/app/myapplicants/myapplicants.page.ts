import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-myapplicants',
  templateUrl: './myapplicants.page.html',
  styleUrls: ['./myapplicants.page.scss'],
})
export class MyapplicantsPage implements OnInit {

  constructor(
    public modalCtrl2: ModalController
  ) { }

  ngOnInit() {
  }
  customAlertOptions13: any = {
    header: 'Please Select ',
  };
  closeModal() {
    this.modalCtrl2.dismiss();
  }
}
