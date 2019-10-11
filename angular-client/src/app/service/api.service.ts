import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { UsersPoint } from '../models/userspoint';
import { Observable } from 'rxjs';
// Import for back-end API URL
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  // Objects to store data coming from back-end:
   public data: UsersPoint[];
   public dashboardView: string;
   public databaseConnection: Observable<boolean>;

  constructor(private http: HttpClient) { }

  // Retrieve connection data for a specific campus building
  public getConnectionDataForBuilding(building: string): Observable<UsersPoint[]> {
    return this.http.get<UsersPoint[]>(environment.backendUrl + '/connectionsByBuilding/b=' + building);
  }

  // Retrieve all parsed connection data from InfluxDB
  public getAllConnectionData(): Observable<UsersPoint[]>  {
    return this.http.get<UsersPoint[]>(environment.backendUrl + '/connections');

  }

  // Add a new data point ot InfluxDB
  public addNewDataPoint(point: UsersPoint) {
    return this.http.post(environment.backendUrl + '/addDataPoint', point);
  }

  // Getter to retrieve user data from InfluxDB in components
  public getUserConnectionData(): UsersPoint[] {
    return this.data;
  }

  // Method to test connection to InfluxDB 
  public testInfluxDBConnection(): Observable<boolean> {
    this.databaseConnection = this.http.get<boolean>(environment.backendUrl + '/testDBConnection');
    return this.databaseConnection;
  }

  // Method to send file to back-end
  public uploadFile(file: File, parseFlag: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', environment.fileUploadAPIUrl + '/uploadData/' + parseFlag, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  // Method to generate a CSV file of InluxDB data to local filesystem
  public downloadCSV(dataSet: string) {
    return this.http.get(environment.backendUrl + '/downloadCSV' + '/' + dataSet);
  }

  public testMethod(): Observable<string> {
    return this.http.get<string>(environment.backendUrl + '/test');
  }


}
