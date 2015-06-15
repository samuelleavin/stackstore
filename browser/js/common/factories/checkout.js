app.factory('CheckoutFactory', function ($q, $http, AuthService) {
	var checkout = {};
	var products = [];

	checkout.getCartItems = function () {

		return $http.get('/api/checkout')
			.then(function (response) {

				products = response.data;

				return products;

			}, function (error) {
				console.log(error);
			})
	}



	checkout.finalCheckout = function (customerInfo, userInfo, cartInfo) {
		//userInfo is the users Billing and Shipping info
		var checkoutInfo = {customerInfo: customerInfo, userInfo: userInfo, cartInfo: cartInfo};
		return $http.post('/api/checkout', checkoutInfo)
			.then(function (response) {
				
				return response.data;

			})
			.catch(function (response) {

            return $q.reject({ message: 'Your form is incomplete.' });
        });
	}


	//////////// now we return factory with all pertinent info
	return checkout;
})