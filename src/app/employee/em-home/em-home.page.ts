import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common.service';
import { KeyValue } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
declare var google;

@Component({
  selector: 'app-em-home',
  templateUrl: './em-home.page.html',
  styleUrls: ['./em-home.page.scss'],
})
export class EmHomePage implements OnInit {
  filters: any = [];
  alljobs: any = [];
  userId: any = localStorage.getItem('haute_userid');
  userToken: any = localStorage.getItem('access_token');
  userRole: any = localStorage.getItem('haute_role');

  items: any;
  autocomplete: any;
  acService: any;
  placesService: any;
  selectedItem: any;
  buttonDisabled = true;
  sessionToken: any;
  currentLon: any;
  currentLat: any;
  destinationCity: string;
  zipCode: string = "";
  show = false;

  facilityFilterArray: any;
  datePostedArray: any;
  jobTypeArray: any;
  perkArray: any;
  travelRequirementArray: any;
  minimumExperienceArray: any;
  workingStudentArray: any;

  allFilteredValues: any;

  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }

  slideOpts1 = {
    initialSlide: 1,
    infinite: false,
    slidesPerView: 3,
    loop: true,
    dot: false,
    speed: 400
  };



  constructor(
    private common: CommonService,
    public api: ApiService,
    public modalCtrll: ModalController,
    public platform: Platform
  ) {
    //this.initPage()
  }

  showToolbar = false;

  onScroll($event) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }
  }

  ngOnInit() {
    this.getFilters();
    this.getJobs();
  }


  geoloc() {
    return new Promise(async resolve => {
      if (this.platform.is('capacitor')) {

        const position = await Geolocation.getCurrentPosition();
        if (position) {
          resolve(position);
        }
        else {

        }

        console.log("------  PLATFORM capacitor");

      }
      else {
        // webgeoloc

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              console.log("============= POSITION  ================");
              console.log(position)
              //Hardcoded 

              resolve(position);
            },
            error => {

              resolve(false);
            }
          );
        }
      }
    })
  }

  goBack() {

  }

  dismiss() {
    console.log("Clear search")
    this.items = [];
    this.autocomplete = {
      query: ''
    };

  }

  initPage() {
    // Create a new session token.
    this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    this.acService = new google.maps.places.AutocompleteService();
    this.items = [];
    this.autocomplete = {
      query: ''
    };
  }

  async ionViewWillEnter() {
    this.items = []
    //this.autocomplete.query = ""

    // const position = await Geolocation.getCurrentPosition();

    // if (position) {
    //   console.log(position)
    //   this.currentLat = position.coords.latitude
    //   this.currentLon = position.coords.longitude
    // }

  }

  getFilters() {
    this.api.post('app/v1/fetch_user_job_filters', { userRole: this.userToken }, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.filters = res;
          this.facilityFilterArray = this.filters.facilityType;
          this.datePostedArray = this.filters.date_posted;
          this.jobTypeArray = this.filters.jobType;
          this.perkArray = this.filters.candCustomFields[0].data;
          this.travelRequirementArray = this.filters.candCustomFields[1].data;
          this.minimumExperienceArray = this.filters.candCustomFields[2].data;
          this.workingStudentArray = this.filters.candCustomFields[3].data;
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
        });
  }
  getJobs() {
    this.common.presentLoading();
    this.api.post('app/v1/fetch_all_jobs', { userRole: this.userToken }, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          this.alljobs = res;
          console.log(this.alljobs);
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
          this.common.stopLoading();
        });
  }

  closeModal() {
    this.modalCtrll.dismiss();
  }

  updateSearch() {
    console.log('modal > updateSearch ' + this.autocomplete.query);
    if (this.autocomplete.query == '') {
      this.items = [];
      this.buttonDisabled = true
      return;
    }
    let self = this;
    let config: any;
    if (this.currentLat) {
      let myLatLng = new google.maps.LatLng({ lat: this.currentLat, lng: this.currentLon });
      config = {
        types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autocomplete.query,
        sessionToken: this.sessionToken,
        language: "EN",
        location: myLatLng,
        radius: 500 * 100 //50Km
        //, 
        //componentRestrictions: { country: 'FR,ES,BE' } 
      }

    }
    else {
      config = {
        types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autocomplete.query,
        sessionToken: this.sessionToken,
        language: "EN"
        //location: {lat: -34, lng: 151},
        //radius: 1000 * 100 //100Km
        //, 
        //componentRestrictions: { country: 'FR,ES,BE' } 
      }

    }

    console.log(config)
    this.acService.getPlacePredictions(config, function (predictions, status) {
      //console.log('modal > getPlacePredictions > status > ', status);
      self.items = [];
      //console.log("predictions "+JSON .stringify(predictions)) 
      if (predictions) {
        predictions.forEach(function (prediction) {
          self.items.push(prediction);
        });
      }
    });

  }

  getFilterValues() {
    const filteredFacilities = this.facilityFilterArray.filter(obj => obj.checked);
    const filteredDatePosted = this.datePostedArray.filter(obj => obj.checked);
    const filteredJobType = this.jobTypeArray.filter(obj => obj.checked);
    const filteredperk = this.perkArray.filter(obj => obj.checked);
    const filteredRequirement = this.travelRequirementArray.filter(obj => obj.checked);
    const filteredMinimumExperience = this.minimumExperienceArray.filter(obj => obj.checked);
    const filteredWorkingStudent = this.workingStudentArray.filter(obj => obj.checked);

    this.allFilteredValues = {
      'facilities': filteredFacilities,
      'datePosted': filteredDatePosted,
      'jobType': filteredJobType,
      'perk': filteredperk,
      'requirement': filteredRequirement,
      'minExprience': filteredMinimumExperience,
      'workingStudent': filteredWorkingStudent
    }
    const formData = new FormData();
    formData.append('userRole', this.userToken);
    formData.append('facilities', JSON.stringify(filteredFacilities));
    formData.append('datePosted', JSON.stringify(filteredDatePosted));
    formData.append('jobType', JSON.stringify(filteredJobType));
    formData.append('perk', JSON.stringify(filteredperk));
    formData.append('requirement', JSON.stringify(filteredRequirement));
    formData.append('minExprience', JSON.stringify(filteredMinimumExperience));
    formData.append('workingStudent', JSON.stringify(filteredWorkingStudent));


    this.api.post('app/v1/fetch_filtered_jobs', formData, '')
      .subscribe(
        (result) => {
          this.common.stopLoading();
          const res: any = result;
          console.log(res);
        },
        (error) => {
          this.common.presentToast(error.message, 'danger');
          console.log(error);
        });

    console.table(this.allFilteredValues);
  }

  replaceSymbol(str: any) {
    var re = "&#036;";
    return str.replace(re, "$");
  }

}
