app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.create', {
       // url: '/products/:item/:sku/:price',
       url: '/create',
       controller: 'promoCreateController',
       templateUrl: 'js/admin/admin-promo/admin-promo-create.html'
   });

});

app.controller('promoCreateController', function ($scope, Admin, $stateParams, AdminPromo, $state) {

      $scope.createdDate = new Date();

      $scope.submitNewPromo = function(promo) {

        AdminPromo.createPromo(promo).then(function(newPromo) {
        
            $state.go('adminMain.promocodes.view');
        });
      };
});