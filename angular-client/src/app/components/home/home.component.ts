import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public role: string;

  constructor(private APIService: ApiService) { 
    this.role = null;
  }

  ngOnInit() {

    if (this.APIService.role != null) {
      this.role = this.APIService.role;
    }

  }

}
