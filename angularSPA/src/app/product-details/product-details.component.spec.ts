import { ProductDetailsComponent } from './product-details.component';
import { of } from 'rxjs';
import { Product } from '../model/product';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let activeRouteSpy: any, productServiceSpy: any;

  beforeEach(() => {
    activeRouteSpy = jasmine.createSpyObj('activeRoute', ['snapshot']);
    activeRouteSpy.snapshot = {
      params : {
        id: 2
      }
    };

    productServiceSpy = jasmine.createSpyObj('productService', ['GetProduct']);

    component = new ProductDetailsComponent(activeRouteSpy, productServiceSpy);
  });

  it('should call product service with product id from active route', () => {
    // arrange
    productServiceSpy.GetProduct = jasmine.createSpy().and.returnValue(of(null));
    // act
    component.ngOnInit();
    // assert
    expect(productServiceSpy.GetProduct).toHaveBeenCalledWith(activeRouteSpy.snapshot.params.id);
  });

  it('should set could not find product flag when parameter id does not return a product', () => {
    // arrange
    productServiceSpy.GetProduct = jasmine.createSpy().and.returnValue(of(null));
    // act
    component.ngOnInit();
    // assert
    expect(component.couldNotFindProduct).toBeTruthy();
  }); 

  it('should leave selected product as null when parameter id does not return a product', () => {
    // arrange
    productServiceSpy.GetProduct = jasmine.createSpy().and.returnValue(of(null));
    // act
    component.ngOnInit();
    // assert
    expect(component.selectedProduct).toBeNull();
  });   

  it('should set selected product when parameter id returns a product', () => {
    // arrange
    let testProduct = new Product();
    productServiceSpy.GetProduct = jasmine.createSpy().and.returnValue(of(testProduct));
    // act
    component.ngOnInit();
    // assert
    expect(component.selectedProduct).toBe(testProduct);
  });  

  it('should leave could not find product flag as false when parameter id returns a product ', () => {
    // arrange
    let testProduct = new Product();
    productServiceSpy.GetProduct = jasmine.createSpy().and.returnValue(of(testProduct));
    // act
    component.ngOnInit();
    // assert
    expect(component.couldNotFindProduct).toBeFalsy();
  });   
});
