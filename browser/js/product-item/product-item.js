app.config(function ($stateProvider) {

    // Register our *product-item* state.
    $stateProvider.state('productItem', {
        // url: '/products/:item/:sku/:price',
        url: '/products/:item',
        controller: 'ProductItemController',
        templateUrl: 'js/product-item/product-item.html'
    });

});

app.controller('ProductItemController', function ($scope, clothing, $stateParams, cartManager) {
	
    $scope.addedToCart = false;

    clothing.getOneProduct($stateParams.item).then(function(item) {
		//console.log(item);
		$scope.product = item;
        // cartManager.addToCart($stateParams.item) 
	});

    $scope.addToCart = function (id) {

        cartManager.addToCart(id).then(function (results) {
            $scope.addedToCart = true;
        }, function (err) {
            console.log(err);
        });
    }

});