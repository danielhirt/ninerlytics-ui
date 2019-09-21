import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';




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
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
