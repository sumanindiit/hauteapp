import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.page.html',
  styleUrls: ['./post-job.page.scss'],
})
export class PostJobPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  customAlertOptions: any = {
    header: 'Select min',
  };
  customAlertOptions2: any = {
    header: 'Select max',
  };
  customAlertOptions3: any = {
    header: 'Facility Type',
  };
  customAlertOptions4: any = {
    header: 'Job Type',
  };
  customAlertOptions5: any = {
    header: 'Min Salary',
  };
  customAlertOptions6: any = {
    header: 'Max Salary',
  };
  customAlertOptions7: any = {
    header: 'Min Batch',
  };
  customAlertOptions8: any = {
    header: 'Max Batch',
  };
  customAlertOptions9: any = {
    header: 'Job Type',
  };
  customAlertOptions10: any = {
    header: 'Diversity Candidates',
  };
  customAlertOptions11: any = {
    header: 'Choose One',
  };
    min = {
    form:null
    }; 
    choose = {
      form:null
      }; 
    max = {
    form:null
    };
    category = {
    form:null
    };  
    functional = {
    form:null
    };
    minsalary = {
    form:null
    };  
    maxsalary = {
    form:null
    };
    minbatch = {
    form:null
    };  
    maxbatch = {
    form:null
    };
    jobtype = {
    form:null
    };  
    candidates = {
    form:null
    };

}
