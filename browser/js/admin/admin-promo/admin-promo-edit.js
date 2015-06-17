app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.edit', {
       // url: '/products/:item/:sku/:price',
       url: '/edit',
       controller: 'promoEditController',
       templateUrl: 'js/admin/admin-promo/admin-promo-edit.html'
   });

});

app.controller('promoEditController', function ($scope, Admin, $stateParams, AdminPromo, $state) {

    var promo = $scope.promo = AdminPromo.getCurrentPromo();
    // $scope.promoName = promo.promoCodeName;
    $scope.reload = function(){
    	$state.reload('adminMain.promocodes.view');
  	};

    $scope.pageName = promo.promoCodeName + '';
    console.log("promo", $scope.promo);
  	// $scope.formValues = {};
  	$scope.updatePromo = function() {
  		AdminPromo.updatePromo(promo).then(function(updatedPromo) {
  			console.log("updatedPromo", updatedPromo);
  			$state.go('adminMain.promocodes.view');
  		});
  	};

  	$scope.deletePromo = function() {
  		AdminPromo.deletePromo(promo).then(function(deletedPromo) {
  			console.log("deletedPromo", deletedPromo);
  			$state.go('adminMain.promocodes.view');
  		});
  	};
 //    $scope.createdDate = AdminPromo.getCurrentPromo().then(function(promo) {
	// 	$scope.promo.createdDate = $scope.promo.created;
	// });
});