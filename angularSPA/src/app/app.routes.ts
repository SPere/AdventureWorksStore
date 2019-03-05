import { Route } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export class AppRoutes {
  static GetRoutes(): Route[] {
    return [
        { path: '', redirectTo: 'product-list', pathMatch: 'full' },
        { path: 'product-list', component: ProductListComponent },
        { path: 'product-details/:id', component: ProductDetailsComponent },
        { path: '**', redirectTo: 'product-list' }
    ]
  }
}