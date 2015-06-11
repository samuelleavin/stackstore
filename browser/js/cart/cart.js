app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, cartManager) {
	
	cartManager.getCart().then(function (results) {
        $scope.cart = results;
    }, function (err) {
        console.log(err);
    });

    $scope.addToCart = function (id) {

        cartManager.addToCart(id).then(function (results) {
            $scope.cart = results;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.removeFromCart = function (id) {
        cartManager.removeFromCart(id)
        .then(function (results) {

            $scope.cart = results;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.getCart = function () {
        console.log($scope.cart);
    }

});