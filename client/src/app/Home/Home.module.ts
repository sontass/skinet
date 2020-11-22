import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]

})
export class HomeModule { }
