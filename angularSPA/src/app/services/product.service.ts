import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';
import { map, first, flatMap, catchError, retry } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private servicePath : String = "v1/products";
  private productCache : Product[] = null;

  constructor(private httpClient: HttpClient) { }

  public GetProducts(): Observable<Product[]> {
      return this.getProductsFromAPI();
  }

  public GetProduct(id: number) : Observable<Product> {
    return this.getProductsFromAPI()
    .pipe(
      flatMap(results => results),
      first(product => product.id === id),
      catchError(err => { return of(null); })
    );
  }

  private getProductsFromAPI(): Observable<Product[]> {
    if(this.productCache !== null)
    {
      return of(this.productCache)
    }

    return this.httpClient
      .get<Product[]>(`${environment.WebAPIUri}/${this.servicePath}`)
      .pipe(
        retry(3),
        map((products: Product[]) => this.productCache = products),
        catchError(err => { console.log('API error', err); return of([])})
      );
  }
}
