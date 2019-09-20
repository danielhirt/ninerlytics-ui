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

@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent,
    MainSectionComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
