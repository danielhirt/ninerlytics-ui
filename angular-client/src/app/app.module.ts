import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MaterialModule } from './components/material/material.module';
import { AppComponent } from './app.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {
 MatNativeDateModule, MatButtonModule, MatCardModule, MatSelectModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatTableModule, MatSortModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatRadioModule, MatDividerModule, MatExpansionModule, MatDatepicker, MatDatepickerModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import { ErrorComponent } from './components/error/error.component';
import { AgmCoreModule } from '@agm/core';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { ReportingComponent } from './components/reporting/reporting.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent,
    MainSectionComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    CardDashboardComponent,
    HeatMapComponent,
    ListViewComponent,
    GraphViewComponent,
    ReportingComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatPaginatorModule,
    NgbModalModule,
    FileUploadModule,
    MatRadioModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['visualization'],
    })

  ],

  providers: [DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
