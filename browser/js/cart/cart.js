app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, cartManager) {

    $scope.cart = undefined;
	
	cartManager.getCart().then(function (results) {

        $scope.cart = results;

    }, function (err) {

        console.log(err);
    });


    $scope.removeFromCart = function () {

        var itemToRemove = this.item.cartItemNumber;

        cartManager.removeFromCart(itemToRemove)
        .then(function (results) {

            $scope.cart = results;
        }, function (err) {
            console.log(err);
        });
    }

});