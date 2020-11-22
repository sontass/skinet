import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  quantity: number;
  product: IProduct;
  constructor(private shopService: ShopService , private activeRoute: ActivatedRoute) { }

  loadProduct(): void {
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(
      product => this.product = product,
      error => console.group(error)
    );
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  decrementQuantity(): void {

  }

  incrementQuantity(): void {

  }
  addItemToBasket(): void {

  }

}
