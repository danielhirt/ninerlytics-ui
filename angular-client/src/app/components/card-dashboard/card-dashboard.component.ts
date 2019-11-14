import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css']
})
export class CardDashboardComponent implements OnInit {

  public loading: boolean;

  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.checkAPI();
  }

public checkAPI() {
  setTimeout(() => {
    this.loading = null;
  },
    3000);
}
}