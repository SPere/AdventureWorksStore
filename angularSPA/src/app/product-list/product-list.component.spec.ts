import { ProductListComponent } from './product-list.component';
import { of } from 'rxjs';
import { Product } from '../model/product';

describe('ProductDetailsComponent', () => {
  let component: ProductListComponent;
  let productServiceSpy: any;

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('productService', ['GetProducts']);

    component = new ProductListComponent( productServiceSpy);
  });

  it('should set could not find product flag when parameter id does not return a product', () => {
    // arrange
    productServiceSpy.GetProducts = jasmine.createSpy().and.returnValue(of([]));
    // act
    component.ngOnInit();
    // assert
    expect(component.couldNotFindProducts).toBeTruthy();
  }); 

  it('should leave selected product as null when parameter id does not return a product', () => {
    // arrange
    productServiceSpy.GetProducts = jasmine.createSpy().and.returnValue(of([]));
    // act
    component.ngOnInit();
    // assert
    expect(component.products).toBeNull();
  });   

  it('should set selected product when parameter id returns a product', () => {
    // arrange
    let testProducts = [ new Product() ];
    productServiceSpy.GetProducts = jasmine.createSpy().and.returnValue(of(testProducts));
    // act
    component.ngOnInit();
    // assert
    expect(component.products).toBe(testProducts);
  });  

  it('should leave could not find product flag as false when parameter id returns a product ', () => {
    // arrange
    let testProducts = [ new Product() ];
    productServiceSpy.GetProducts = jasmine.createSpy().and.returnValue(of(testProducts));
    // act
    component.ngOnInit();
    // assert
    expect(component.couldNotFindProducts).toBeFalsy();
  });   
});
