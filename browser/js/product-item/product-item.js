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
        selectedSize : undefined,
        quantity : 0,
        color: undefined,
    }

    clothing.getOneProduct($stateParams.item).then(function(item) {

        delete item.inventory

        console.log(item)

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

    $scope.addToCart = function () {

        if (!productInfo.selectedSize) {
            return $scope.error = 'Please select a size to continue.'
        } else if (!productInfo.color) {
            return $scope.error = 'Please select a color to continue.'
        } else if (!productInfo.quantity) {
            return $scope.error = 'Please specify a quantity to continue.'
        } else {
            $scope.product.inventory = productInfo;
        }

        cartManager.addToCart($scope.product).then(function (results) {

            console.log('inside ProductItemController addtocart, returned from call', results)
            $scope.addedToCart = true;
        }, function (err) {
            console.log(err);
            throw new Error(err.message);
        });
    }

});