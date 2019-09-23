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
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent,
    MainSectionComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
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
    NgbModalModule

  ],

  providers: [DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
