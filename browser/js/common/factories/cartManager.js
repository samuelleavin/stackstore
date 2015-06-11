app.factory('cartManager', function ($http, AuthService) {
	var cart = {};
	var products = [];

	cart.addToCart = function (productId) {

		return $http.put('/api/cart/' + productId)
			.then(function (response) {

				products = response.data;

				return products;

			}, function (error) {
				console.log(error);
			})
	}

	cart.removeFromCart = function (productId) {

		return $http.delete('/api/cart/' + productId)
			.then(function (response) {

				products = response.data;

				return products;

			}, function (error) {
				console.log(error);
			})
	}

	cart.getCart = function () {

		return $http.get('/api/cart/')
			.then(function (response) {

				products = response.data;

				return products;

			}, function (err) {
				console.log(err);
			})
	}
	//////////// now we return factory with all pertinent info
	return cart;
})