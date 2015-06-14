app.directive('customerInfo', function (CheckoutFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/checkout/checkout.html',
        link: function(scope){
        	
        	CheckoutFactory.getCartItems().then(function (results) {

            scope.usersShoppingCart = results;
            console.log("thi si sthe directive resutls should be products", results)
        	}, function (err) {
            	console.log(err);
        	});
        }
    }

});