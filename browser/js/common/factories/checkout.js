app.factory('CheckoutFactory', function ($q, $http, AuthService) {
	var checkout = {};
	var products = [];

	checkout.getCartItems = function () {

		return $http.get('/api/checkout')
			.then(function (response) {
				console.log("this is response shopping", response.data)
				products = response.data;

				return products;

			}, function (error) {
				console.log(error);
			})
	}

	checkout.finalCheckout = function (userInfo) {
		//userInfo is the users Billing and Shipping info
		return $http.post('/api/checkout', userInfo)
			.then(function (response) {
				//this is the message from the route: thank you for your purchase!
				return response.data;

			})
			.catch(function (response) {

            return $q.reject({ message: 'Your form is incomplete.' });
        });
	}
	//////////// now we return factory with all pertinent info
	return checkout;
})