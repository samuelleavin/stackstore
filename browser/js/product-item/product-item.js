app.config(function ($stateProvider) {

    // Register our *product-item* state.
    $stateProvider.state('productItem', {
        url: '/products/:item',
        controller: 'ProductItemController',
        templateUrl: 'js/product-item/product-item.html'
    });

});

app.controller('ProductItemController', function ($scope, clothing, $stateParams) {
	clothing.getOneProduct($stateParams.item).then(function(item) {
		//console.log(item);
		$scope.product = item;
	});

});