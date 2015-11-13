app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain', {
       // url: '/products/:item/:sku/:price',
       url: '/admin',
       controller: 'AdminController',
       templateUrl: 'js/admin/admin.html'
   });

});

app.controller('AdminController', function ($scope, Admin) {
  Admin.getProducts().then(function (products) {
    $scope.products = products;
  }, function (err) {
    console.error(err);
  });
    
});
