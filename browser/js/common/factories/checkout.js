app.factory('CheckoutFactory', function ($q, $http, AuthService) {
	var checkout = {};
	var products = [];

	checkout.finalCheckout = function (customerInfo, userInfo, cartInfo) {
		//userInfo is the users Billing and Shipping info
		var checkoutInfo = {customerInfo: customerInfo, userInfo: userInfo, cartInfo: cartInfo};
		return $http.post('/api/checkout', checkoutInfo)
			.then(function (response) {
				
				return response.data;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
	}

	checkout.beforeFinalCheckoutForPromos = function(promoCode) {
		return $http.get('/api/promo/' +promoCode)
			.then(function(response){
				return response.data;
			}, function(err){
				return new Error(err.message);
			});
	}

	//////////// now we return factory with all pertinent info
	return checkout;
})