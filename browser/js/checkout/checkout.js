app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutController', function ($state, $scope, $timeout, CheckoutFactory) {
    
    $scope.customerInfo = {};

    $scope.orderInfo = {};

    $scope.billingAddress = false;

    $scope.getTotal = function() {
        var total = 0, product;
        if(!$scope.usersShoppingCart) return;
        for(var i = 0; i < $scope.usersShoppingCart.length; i++) {
            product = $scope.usersShoppingCart[i];
            total += product.price;
        }
        return total;
    }


    $scope.checkout = function(customerInfo, orderInfo, cartInfo) {
        
        CheckoutFactory.finalCheckout(customerInfo, orderInfo, cartInfo)
        .then(function(results) {
            
            $scope.success = results.message;

            var onSuccess = function () {
                    $state.go('home')
                }

            $timeout(onSuccess, 2000);
        })
        .catch(function () {
                $scope.error = 'Order not complete.';
        });
    }

});