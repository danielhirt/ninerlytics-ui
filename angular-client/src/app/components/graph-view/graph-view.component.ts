import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {

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
