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
        var usersCart = $scope.usersShoppingCart;
        $scope.percent = discount;
        return CheckoutFactory.getTotals(discount, usersCart);           
    }

    $scope.checkPromoCode = function(promoCode) {

        CheckoutFactory.beforeFinalCheckoutForPromos(promoCode)
            .then(function(results){

                var arrOfDiscountable = _.flatten(_.values(results.validFor), true);
                var usersCart = $scope.usersShoppingCart;
                var usersItemsCategories = _.pluck($scope.usersShoppingCart, "category");
                var usersItemsProducts = _.pluck($scope.usersShoppingCart, "sku");
                var usersItemsValidForDiscount = _.union(usersItemsCategories, usersItemsProducts);

                var discountable = _.intersection(arrOfDiscountable, usersItemsValidForDiscount);
                
                _.forEach(usersCart, function(product) {
                    _.forEach(discountable, function(typesDiscountable) {
                        if(product.category === typesDiscountable || product.sku === typesDiscountable) {
                            $scope.discount = (1 - results.discount/100);
                        } else {
                            $scope.discount = 1;
                        }
                    }) 
                })
                
                // $scope.discount = (1 - results.discount/100);
                    
            }, function (err) {
                console.log(err);
        });

    }


    var comparer = function(product) {
        
        if(product.category === discountable[0]) {
            product.price *= (1 - results.discount/100);
        }
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