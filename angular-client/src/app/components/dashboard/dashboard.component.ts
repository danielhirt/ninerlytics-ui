import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsersPoint } from 'src/app/models/userspoint';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import {  } from '@google/maps';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userConnectionData: UsersPoint[];
  public totalUtilizationData: UsersPoint[];
  public newDataPoint: UsersPoint;
  public filePath: string;
  public dashboardView: string;
  public closeResult: string;
  public saveMessage: boolean;
  public saveResult: string;
  public loading: boolean;
  public selectedFiles: FileList;
  public currentFile: File;
  public msg: any;
  public parseFlag: string;
  public buildingSelection: string;
  public lat: any;
  public lng: any;
  public zoom: number;
  private map: google.maps.Map = null;
  private heatmapData: any[];
  public timeRange: string;
  public dataSetForCSV: string;
  
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select', 'time', 'connections', 'disconnections', 'icon'];
  tableDataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  constructor(private APIService: ApiService, private modalService: NgbModal) {
    this.tableDataSource = new MatTableDataSource();
    this.newDataPoint = new UsersPoint();
    this.userConnectionData = new Array<UsersPoint>();
    this.heatmapData = new Array<any[]>();
  }

  ngOnInit() {
    this.loading = true;
    this.dashboardView = this.APIService.dashboardView;
    this.parseFlag = "no";
    this.saveMessage = null;
    // set initial table data
    this.buildingSelection = "Atki"; 
    this.dataSetForCSV = "Atki";
    this.timeRange = "24hrs";
    // set initial map focus
    this.lat = 35.305786; 
    this.lng = -80.732111;
    this.zoom = 18;

    // total utilization data from service
    this.totalUtilizationData = this.APIService.data;

    // On init of dashboard component, fetch default data. Currently set to Atkins data.
    this.APIService.getConnectionDataForBuilding("Atki").subscribe(data => {
      this.userConnectionData = data;
      this.tableDataSource.data = this.userConnectionData;
      console.log("User connection data retrieved from API: ", this.userConnectionData);

      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;
      //this.onMapLoad(this.map);
    }, error => {
      console.log("Error retrieving data: ", error);
    }); 
    this.checkAPI();  
  }

  /*public getMapInstance(mapInstance: google.maps.Map) {
    this.map = mapInstance;
  }*/

  /*public onMapLoad(mapInstance: google.maps.Map) {
    console.log('entered map function');
    console.log(this.totalUtilizationData);
    let point = {}
    for (let entry of this.totalUtilizationData) {
       point = {location: new google.maps.LatLng(entry.latitude, entry.longitude), weight: entry.connections};     
       this.heatmapData.push(point);
    }
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.heatmapData,
      radius: 50,
      maxIntensity: 80
    
    });
   heatmap.setMap(mapInstance);
  
}*/

  public changeTableData(building: string) {
    if (building === 'all'){
      this.dataSetForCSV = building;
      this.APIService.getAllConnectionData().subscribe(data => {
        this.userConnectionData = data;
        this.tableDataSource.data = this.userConnectionData;
        console.log("User connection data retrieved from API: ", this.userConnectionData);
      }, error => {
        console.log("Error retrieving data: ", error);
      });
    } else {
    this.APIService.getConnectionDataForBuilding(building).subscribe(data => {
      this.userConnectionData = data;
      this.tableDataSource.data = this.userConnectionData;
      console.log("User connection data retrieved from API: ", this.userConnectionData);
    }, error => {
      console.log("Error retrieving data: ", error);
    });
  }
  }

  public checkAPI() {
    setTimeout(() => {
      this.loading = null;
    },
      3000);
  }

  public downloadCSV(dataSet: string) {
    dataSet = this.dataSetForCSV;
    console.log("Dataset to generate CSV with: ", dataSet);
    this.APIService.downloadCSV(this.dataSetForCSV).subscribe(result => {
      console.log(result);
    }, error => {
      console.log("Error generating CSV: ", error);
    });
  }

  public saveNewDataPointFunction() {
    this.APIService.addNewDataPoint(this.newDataPoint).subscribe(result => {
      if (result != null) {
        this.saveMessage = true;
        console.log("Successfully posted new data point: ", result);
      } else {
        this.saveMessage = false;
        console.log("Error posting new data point: ");
      }
    }, error => {
      console.log(error);
    });
    this.ngOnInit(); // refresh table datasource
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.APIService.uploadFile(this.currentFile, this.parseFlag).subscribe(response => {
      console.log(this.selectedFiles.length)
      if (response instanceof HttpResponse) {
        this.msg = response.body;
        console.log(response.body);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  openDataModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'add-data', size: 'lg' }).result.then((result) => {
      this.saveMessage = null;
      this.msg = null;
      this.parseFlag = "no";
      this.selectedFiles = null;
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public refreshFunction() {
    this.ngOnInit();
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows =  this.tableDataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.tableDataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }


}
