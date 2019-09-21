import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }

  opened = false;

}
