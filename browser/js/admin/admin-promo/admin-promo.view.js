app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.view', {
       // url: '/products/:item/:sku/:price',
       url: '/admin/promos/view',
       controller: 'promoViewController',
       templateUrl: 'js/admin/admin-promo/admin-promo-view.html'
   });

});

app.controller('promoViewController', function ($scope, Admin) {
    
});