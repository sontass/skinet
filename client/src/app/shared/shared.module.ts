import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';




@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule , CarouselModule , PagingHeaderComponent , PagerComponent]
})
export class SharedModule { }
