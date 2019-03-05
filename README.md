"# AdventureWorksStore" 

Store front using .Net Core 2 WebAPI, Angular 7, Rxjs, Bootstrap, Typescript

To run the website:

1. Open TestApi.sln in Visual Studio and run the code. The api should be available at http://localhost:50324/v1/products

2. Open command prompt, navigate to angularSPA and run the below
npm init : to pull down the node packages
npm start : to run ng server and start the server
now browse to http://localhost:4200/

Vola!



Few points:

1. Random urls should redirect the customer back to product list page.

2. If the customer enters a product id that does not exist in the product details page, they are told "This product could not be found" and given the link back to home page.

3. Only one call is made to the api endpoint. The result are cached in the service layer to make the user experience more appealing (in this case a small dataset)

4. If the api is down, the service tries 3 more times via the magic of rxjs retry, before tell the customer "Oops! could not load the products, please re-visit later". A loading message is shown whilst it is trying to get the products in the background.

5. The api endpoint is keep in the environment folder "angularSPA\src\environments\". A different url could be entered in the environment.prod.ts file for production web api servers.

6. A Typescript model was used to get "Product" intellisense in VS Code, located in "angularSPA\src\app\model"


