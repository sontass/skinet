import { delay, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('BrandId' , shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('TypeId' , shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search' , shopParams.search);
    }


    params = params.append('sort' , shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());



    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        //delay(1000),
        map(response => {
          return response.body;
        })
      );
  }

getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }

}
