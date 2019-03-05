import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product = null;
  couldNotFindProduct: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let productId = +this.activeRoute.snapshot.params['id'];
    this.productService.GetProduct(productId).subscribe(product => {
      if(product === null) {
        this.couldNotFindProduct = true;
      } else {
        this.selectedProduct = product;
      }
    });
  }

}
