app.directive('promoCode', function (cartManager) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/checkout/promoCode_checkout.html',
        link: function(scope){

        	cartManager.getCart().then(function (results) {

            scope.usersShoppingCart = results;

        	}, function (err) {
            	console.log(err);
        	});
        }
    }

});