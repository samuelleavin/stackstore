app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes.view', {
       // url: '/products/:item/:sku/:price',
       url: '/view',
       controller: 'promoViewController',
       templateUrl: 'js/admin/admin-promo/admin-promo-view.html'
   });

});

app.controller('promoViewController', function ($scope, Admin, AdminPromo, $state) {
    // getPromos
    AdminPromo.getPromos().then(function(promos) {
		  $scope.promos = promos;
    });

    $scope.updatedPromos = false;

    if ($scope.updatedPromos) {
    	$scope.updateMessage = "You successfully updated!";
    };
    
    // get One Promo
    $scope.editPromo = function() {
		var promoToEdit = this.promo;
		AdminPromo.assignCurrentPromo(promoToEdit);
		$scope.updatedPromos = true;
		$state.go('adminMain.promocodes.edit');

    };
});
