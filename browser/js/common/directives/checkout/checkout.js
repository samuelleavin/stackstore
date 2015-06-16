app.directive('customerInfo', function (cartManager) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/checkout/checkout.html',
        link: function(scope){
        	
        	cartManager.getCart().then(function (results) {

            scope.usersShoppingCart = results;

        	}, function (err) {
            	console.log(err);
        	});
        }
    }

});