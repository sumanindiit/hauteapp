import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mysubscription',
  templateUrl: './mysubscription.page.html',
  styleUrls: ['./mysubscription.page.scss'],
})
export class MysubscriptionPage implements OnInit {

  constructor() { }

  showToolbar = false;

  onScroll($event) 
  {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  ngOnInit() {
  }

}
