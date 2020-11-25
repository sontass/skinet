import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search' , {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabet' , value: 'name'},
    { name: 'Price: Low to Heigh' , value: 'priceAsc'},
    { name: 'Price: Height to Low' , value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe(
      (res: IPagination) =>  {
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
        this.products = res.data;
      } ,
      error => console.log(error)
    );
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(
      (res: IBrand[]) => this.brands = [{id: 0 , name: 'All'} , ...res],
      error => console.log(error)
    );
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe(
      (res: IProductType[]) => this.types = [{id: 0 , name: 'All'} , ...res],
      error => console.log(error)
    );
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
      this.shopParams.typeId = typeId;
      this.shopParams.pageNumber = 1;
      this.getProducts();
  }

  onSortSelected(sort: string): void {
    console.log('sort' , sort);
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any): void {
    if(!this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();

  }
}
