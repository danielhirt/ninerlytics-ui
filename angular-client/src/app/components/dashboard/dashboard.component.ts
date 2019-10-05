import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsersPoint } from 'src/app/models/userspoint';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userConnectionData: UsersPoint[];
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

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private APIService: ApiService, private modalService: NgbModal) {
    this.tableDataSource = new MatTableDataSource();
    this.newDataPoint = new UsersPoint();

  }

  displayedColumns: string[] = ['select', 'time', 'connections', 'disconnections', 'icon'];
  tableDataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  ngOnInit() {
    this.loading = true;
    this.dashboardView = this.APIService.dashboardView;
    this.parseFlag = "no";
    this.saveMessage = null;
    this.buildingSelection = "Atki";

    // On init of dashboard component, fetch relevent data. In this case list of connections.
    this.APIService.getConnectionDataForBuilding("Atki").subscribe(data => {
      this.userConnectionData = data;
      this.tableDataSource.data = this.userConnectionData;
      console.log("User connection data retrieved from API: ", this.userConnectionData);

      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;
    }, error => {
      console.log("Error retrieving data: ", error);
    }); 

    this.checkAPI();
  }

  public changeTableData(building: string) {
    this.APIService.getConnectionDataForBuilding(building).subscribe(data => {
      this.userConnectionData = data;
      this.tableDataSource.data = this.userConnectionData;
      console.log("User connection data retrieved from API: ", this.userConnectionData);

    }, error => {
      console.log("Error retrieving data: ", error);
    });

  }

  public checkAPI() {
    setTimeout(() => {
      this.loading = null;
    },
      3000);

  }

  public downloadCSV() {
    this.APIService.downloadCSV().subscribe(result => {
      console.log(result);
      this.saveMessage = true;
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
