app.factory('PromoCodeFactory', function ($q, $http, AuthService) {
	var promoCode = {};
	var products = [];

	promoCode.applyPromoCode = function (customerInfo, userInfo, cartInfo) {
		//userInfo is the users Billing and Shipping info
		var checkoutInfo = {customerInfo: customerInfo, userInfo: userInfo, cartInfo: cartInfo};
		return $http.post('/api/checkout', checkoutInfo)
			.then(function (response) {
				
				return response.data;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
	}

	//////////// now we return factory with all pertinent info
	return promoCode;
})