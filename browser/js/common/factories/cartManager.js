app.factory('cartManager', function ($http, AuthService) {
	var cart = {};
	var products = [];

	cart.addToCart = function (productId) {

		return $http.put('/api/cart/' + productId)
			.then(function (response) {

				products = response.data;

				return products;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
	}

	cart.removeFromCart = function (productId) {

		return $http.delete('/api/cart/' + productId)
			.then(function (response) {

				products = response.data;

				return products;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
	}

	cart.getCart = function () {

		return $http.get('/api/cart/')
			.then(function (response) {

				products = response.data;

				return products;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
	}
	//////////// now we return factory with all pertinent info
	return cart;
})