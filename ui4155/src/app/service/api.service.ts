import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersPoint } from '../models/userspoint';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL: string;

  // Objects to store data coming from back-end:
   public userConnectionData: UsersPoint[];

   public dashboardView: string;

  constructor(private http: HttpClient) { 
    
    this.API_URL = "http://localhost:8080/api/v1"; // Master entry point to API
  }

  // Retrieve all parsed connection data from InfluxDB
  public getAllConnectionData(): Observable<UsersPoint[]> {
    return this.http.get<UsersPoint[]>(this.API_URL + '/connections');

  }

  public addNewDataPoint(point: UsersPoint) {
    return this.http.post(this.API_URL + '/addDataPoint', point);
  }

  public getUserConnectionData(): UsersPoint[] {
    return this.userConnectionData;
  }



}
