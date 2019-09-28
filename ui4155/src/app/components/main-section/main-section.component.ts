import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {

  opened: boolean;

  constructor(private apiService : ApiService, private dashboardComponent: DashboardComponent) { 


  }

  ngOnInit() {
    setTimeout(() => {  
      this.opened = true;
    },
      3000);

  }

  public updateViewFunction(view: string) {
    console.log(view);
    if (view === "grafana") {
      console.log(view);
    this.apiService.dashboardView = view;
    this.dashboardComponent.dashboardView = view;
    this.dashboardComponent.ngOnInit();
    console.log(this.dashboardComponent.dashboardView);
    }
  }


  

}
