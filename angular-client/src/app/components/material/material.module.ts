import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

const MaterialComponents =[
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule
];
@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
