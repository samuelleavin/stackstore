app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.create', {
       // url: '/products/:item/:sku/:price',
       url: '/admin/promos/create',
       controller: 'promoCreateController',
       templateUrl: 'js/admin/admin-promo/admin-promo-create.html'
   });

});

app.controller('promoCreateController', function ($scope, Admin, $stateParams, AdminPromo) {

      $scope.createdDate = new Date();
    // $scope.promoName = promo.promoCodeName;

    // $scope.createdDate = new Date();
 //    $scope.createdDate = AdminPromo.getCurrentPromo().then(function(promo) {
	// 	$scope.promo.createdDate = $scope.promo.created;
	// });
});