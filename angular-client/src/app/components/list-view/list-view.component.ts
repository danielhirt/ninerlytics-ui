import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { macJSON } from 'src/app/models/macjson';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public macJSON: string;
  public dataJSON: macJSON[];
  public macObject: macJSON;
  public dataKeys: any[];
  public dataPairs: any[];
  public macData: macJSON[];

  public startDate: string;
  public endDate: string;

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select','mac', 'start', 'end', 'icon'];
  tableDataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  constructor(private APIService: ApiService) {
    this.tableDataSource = new MatTableDataSource();
    this.macData = new Array<macJSON>();
    this.dataJSON = new Array<macJSON>();
    this.dataKeys = new Array<any>();
    this.macObject = new macJSON();
  }

  ngOnInit() {

    this.startDate = '2019-10-10T15:17:01-04:00';
    this.endDate = '2019-10-10T15:17:03-04:00';

    this.APIService.getMacTrackingJSON(this.startDate, this.endDate).subscribe(data => {
      console.log("DATA FROM API: ", data);
      this.macJSON = data;

      this.dataKeys = Object.keys(this.macJSON);
      this.dataPairs = Object.values(this.macJSON);

      for (let i = 0;  i < this.dataKeys.length; ++i) {   
       this.dataJSON.push({macAddress: this.dataKeys[i], start: this.dataPairs[i][Object.keys(this.dataPairs[i])[0]], end: this.dataPairs[i][Object.keys(this.dataPairs[i])[1]]});
      } 

      this.tableDataSource.data = this.dataJSON;
      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;

    }, error => {
      console.log("Error retrieving MAC data: ", error);
    });

  
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
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


  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  
  public refreshFunction() {
    this.ngOnInit();
  }

}
