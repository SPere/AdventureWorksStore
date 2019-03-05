import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] = null;
  couldNotFindProducts: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetProducts().subscribe(products => {
      if(products.length === 0) {
        this.couldNotFindProducts = true;
      } else {
        this.products = products;
      }
    });
  }
}
