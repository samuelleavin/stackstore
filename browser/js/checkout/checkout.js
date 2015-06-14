app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutController', function ($state, $scope, $timeout, CheckoutFactory) {
    
    $scope.orderInfo = {};

    $scope.checkout = function(orderInfo) {
        CheckoutFactory.finalCheckout(orderInfo)
        .then(function(results) {
            console.log("this is results", results)
            // $scope.success = results.message;

            // var onSuccess = function () {
            //         $state.go('home')
            //     }

            // $timeout(onSuccess, 2000);
        })
        .catch(function () {
                $scope.error = 'Order not complete.';
        });
    }

});