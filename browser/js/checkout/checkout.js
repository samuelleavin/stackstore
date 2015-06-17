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

    $scope.discount;


    $scope.getTotal = function(discount) {
        var total = 0, product;
        if(!$scope.usersShoppingCart) return;
        
        for(var i = 0; i < $scope.usersShoppingCart.length; i++) {
            product = $scope.usersShoppingCart[i];
            total += product.price;
        }
            if(discount){
                total *= discount;
            }
        return total;
    }   


    $scope.getTotal = function(discount) {
        var usersCart = $scope.usersShoppingCart;
        return CheckoutFactory.getTotals(discount, usersCart);           
    }

    $scope.checkPromoCode = function(promoCode) {

        CheckoutFactory.beforeFinalCheckoutForPromos(promoCode)
            .then(function(results){

                var arrOfDiscountable = _.flatten(_.values(results.validFor), true);
                console.log('this is scope.item in the contorler', $scope.usersShoppingCart)
                var validCategories = _.pluck($scope.usersShoppingCart, "category");
                var validProducts = _.pluck($scope.usersShoppingCart, "sku");
                var validArrayOfBoth = _.union(validCategories, validProducts);
                // console.log("this is form contorller ",  validArrayOfBoth)
                console.log('this is a lot of fun', arrOfDiscountable)
                if(validArrayOfBoth.indexOf())

                // if(arrOfDiscountable.indexOf($scope.item)
                $scope.discount = (1 - results.discount/100);
                    
            }, function (err) {
                console.log(err);
        });

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