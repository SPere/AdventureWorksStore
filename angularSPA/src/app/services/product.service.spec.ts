import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../model/product';

describe('ProductServiceService', () => {
    let service : ProductService;
    let httpClientSpy: any;
    let testProducts = []

    beforeEach(() => {
        let testProduct1 = new Product();
        testProduct1.id = 1;
        let testProduct2 = new Product();
        testProduct2.id = 2;
        testProducts.push(testProduct1);
        testProducts.push(testProduct2);

        httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
        service = new ProductService(httpClientSpy);
    });

    describe('GetProducts call', () => {
        it('should call api to get products', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of([]));
            // act
            service.GetProducts();
            // assert
            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(httpClientSpy.get.calls.allArgs()[0][0]).toContain('v1/products');
        });

        it('should not call api when products are cached', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of(testProducts));
            // act
            service.GetProducts().subscribe();
            service.GetProducts().subscribe();
            service.GetProducts().subscribe();
            // assert
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });  
        
        it('should return an empty list when the api returns an error', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(throwError('some error'));
            // act
            let requiredProducts;
            service.GetProducts().subscribe(x => requiredProducts = x)
            // assert
            expect(requiredProducts).toEqual([]);
        });
    });

    describe('GetProduct call', () => {
        it('should call api to get products', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of([]));
            // act
            service.GetProduct(1);
            // assert
            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(httpClientSpy.get.calls.allArgs()[0][0]).toContain('v1/products');
        }); 
        
        it('should not call api when products are cached', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of(testProducts));
            // act
            service.GetProduct(2).subscribe();
            service.GetProduct(2).subscribe();
            service.GetProduct(2).subscribe();
            // assert
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });  

        it('should only return product with the matching id', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of(testProducts));
            // act
            let requiredProduct;
            service.GetProduct(2).subscribe(x => requiredProduct = x)
            // assert
            expect(requiredProduct.id).toBe(2);
        });         

        it('should return null when there is no matching id', () => {
            httpClientSpy.get = jasmine.createSpy().and.returnValue(of(testProducts));
            // act
            let requiredProduct;
            service.GetProduct(3).subscribe(x => requiredProduct = x)
            // assert
            expect(requiredProduct).toBeNull();
        });         
    });
});
