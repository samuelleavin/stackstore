// substate - product management

app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminProducts', {
       // url: '/products/:item/:sku/:price',
       url: '/products',
       controller: 'AdminProductsController',
       templateUrl: 'js/admin/admin-products.html'
   });

});

app.controller('AdminProductsController', function ($scope) {
  
});