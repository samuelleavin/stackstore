app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.edit', {
       // url: '/products/:item/:sku/:price',
       url: '/admin/promos/edit',
       controller: 'promoEditController',
       templateUrl: 'js/admin/admin-promo/admin-promo-edit.html'
   });

});

app.controller('promoEditController', function ($scope, Admin, $stateParams, AdminPromo) {

    var promo = $scope.promo = AdminPromo.getCurrentPromo();
    // $scope.promoName = promo.promoCodeName;

    $scope.pageName = promo.promoCodeName + '';
    console.log("promo", $scope.promo);
  	// $scope.formValues = {};
  	$scope.updateProduct = function() {
  		AdminPromo.updatePromo(promo).then(function(updatedPromo) {
  			
  		});
  	};


 //    $scope.createdDate = AdminPromo.getCurrentPromo().then(function(promo) {
	// 	$scope.promo.createdDate = $scope.promo.created;
	// });
});