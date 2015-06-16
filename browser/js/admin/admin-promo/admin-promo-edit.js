app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.edit', {
       // url: '/products/:item/:sku/:price',
       url: '/admin/promos/edit',
       controller: 'promoEditController',
       templateUrl: 'js/admin/admin-promo/admin-promo-edit.html'
   });

});

app.controller('promoEditController', function ($scope, Admin) {
    
});