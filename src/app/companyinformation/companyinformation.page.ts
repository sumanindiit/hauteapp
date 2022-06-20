import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-companyinformation',
  templateUrl: './companyinformation.page.html',
  styleUrls: ['./companyinformation.page.scss'],
})
export class CompanyinformationPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
) {}

  ngOnInit() {
  }
  customAlertOptions12: any = {
    header: 'Choose Facility Type ',
  };

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
