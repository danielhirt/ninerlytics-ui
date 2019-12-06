import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {MatDatepickerInputEvent} from '@angular/material/datepicker'

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {

  public loading: boolean;

  event1: String = "1568606400000";
  event2: String = "1568692799000";
  event3: String = "Mon Sep 16 2019";
  event4: String = "Tue Sep 17 2019";

  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://campusheatmap.com:3000/d-solo/ypybxE1Zz/new-dashboard-copy?orgId=1&from=" + this.event1 + "&to=" + this.event2 + "&panelId=2");

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.event2 = event.value.getTime().toString();
    this.event4 = event.value.toDateString();
    this.setURL();
  }

  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.event1 = event.value.getTime().toString();
    this.event3 = event.value.toDateString();
    this.setURL();
  }

  fixBackwardsDates(date1: Date, date2: Date){    
    this.event1 = date2.getTime().toString();
    this.event2 = date1.getTime().toString();
  }

  setURL(){
    let date1 : Date = new Date(this.event3.toString());
    let date2 : Date = new Date(this.event4.toString());
    if(date1 < date2){
      let temp: string = "http://campusheatmap.com:3000/d-solo/ypybxE1Zz/new-dashboard-copy?orgId=1&from=" + this.event1 + "&to=" + this.event2 + "&panelId=2";
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    } else if (date2 < date1){
      this.fixBackwardsDates(date1, date2);
      let temp: string = "http://campusheatmap.com:3000/d-solo/ypybxE1Zz/new-dashboard-copy?orgId=1&from=" + this.event1 + "&to=" + this.event2 + "&panelId=2";
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    } //else {

    //}
  }

  getURL(urlIn){
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlIn);
  }
  
  constructor(private sanitizer: DomSanitizer) { }

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
