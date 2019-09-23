import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsersPoint } from 'src/app/models/userspoint';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userConnectionData: UsersPoint[];
  public newDataPoint: UsersPoint;

  public dashboardView: string;
  public closeResult: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private APIService: ApiService, private modalService: NgbModal) { 
    this.tableDataSource = new MatTableDataSource(); 
    this.newDataPoint = new UsersPoint();
      
  }

  displayedColumns: string[] = ['time', 'connections', 'disconnections', 'icon'];
  tableDataSource: MatTableDataSource<any>;

  ngOnInit() {

    this.dashboardView = this.APIService.dashboardView;

    // On init of dashboard component, fetch relevent data. In this case list of connections.
    this.APIService.getAllConnectionData().subscribe(data => {
      this.userConnectionData = data;
      this.tableDataSource.data = this.userConnectionData;
      console.log("User connection data retrieved from API: ", this.userConnectionData);

      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;
    }, error => {
      console.log("Error retrieving data: ", error);
    });

  }

  public saveNewDataPointFunction() {
    this.APIService.addNewDataPoint(this.newDataPoint).subscribe(result => {
        if (result != null) {
          console.log("Successfully posted new data point: ", result);
        } else {
          console.log("Error posting new data point: ");
        }
    }, error => {
      console.log(error);
    });

    this.ngOnInit(); // refresh table datasource

  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  public refreshFunction() {
    this.ngOnInit();
  }

  openDataModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'add-data', size: 'lg'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }


}
