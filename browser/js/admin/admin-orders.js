// substate - order management

app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminOrders', {
       // url: '/products/:item/:sku/:price',
       url: 'orders',
       controller: 'AdminOrdersController',
       templateUrl: 'js/admin/admin-orders.html'
   });

});

app.controller('AdminOrdersController', function ($scope) {
  
});