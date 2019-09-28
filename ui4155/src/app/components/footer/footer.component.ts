import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private databaseConnection: boolean;
  influxDBError: string;
  
  constructor(private APIService: ApiService) { 
    this.databaseConnection = false;
  }

  ngOnInit() {

    this.APIService.testInfluxDBConnection().subscribe(result => {
      if (result = true) {
        this.databaseConnection = result;
        console.log("Database connection success.");
      } 

    }, error => {
      console.log("Error with database connection: ", error);
      this.influxDBError = error;
    });
  }

}
