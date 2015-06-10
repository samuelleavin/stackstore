app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, cart) {
	
	cart.getCart().then(function (results) {
        $scope.cart = results;
    }, function (err) {
        console.log(err);
    });

    $scope.addToCart = function (id) {

        $scope.cart = cart.addToCart(id);
    }

    $scope.removeFromCart = function (id) {
        $scope.cart = cart.removeFromCart(id);
    }

    $scope.getCart = function () {
        console.log($scope.cart);
    }

});