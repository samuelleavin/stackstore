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
    $scope.selectedSize = '';
    $scope.sizes = [];
    $scope.colors = [];
    $scope.quantityToPurchase = 0;
    
    var productInfo = {
        sku: 0,
        selectedSize : '',
        quantity : 0,
        color: ''
    }

    clothing.getOneProduct($stateParams.item).then(function(item) {

		$scope.product = item;

        $scope.sizes = clothing.availableSizes();

        $scope.colors = clothing.availableColors();

        productInfo.sku = item.sku;

	});

    $scope.assignSize = function () {
        productInfo.selectedSize = this.size;
    }

    $scope.assignColor = function () {
        productInfo.color = this.color;
    }

    $scope.assignQuantity = function (q) {
        productInfo.quantity = q;
    }

    $scope.test = function () {
        console.log(productInfo);
    }

    $scope.addToCart = function (id) {

        cartManager.addToCart(id).then(function (results) {
            $scope.addedToCart = true;
        }, function (err) {
            console.log(err);
        });
    }

});