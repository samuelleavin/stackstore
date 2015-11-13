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
        console.error(err);
    });


    $scope.removeFromCart = function (id) {
        cartManager.removeFromCart(id)
        .then(function (results) {

            $scope.cart = results;
        }, function (err) {
            console.error(err);
        });
    }

});
