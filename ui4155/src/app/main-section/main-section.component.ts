import { Component, OnInit } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  opened = false;

}
