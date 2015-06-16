app.factory('cartManager', function ($http, AuthService) {
	var cartManager = {};
	var products = [];

	cartManager.addToCart = function (product) {

		console.log('in addToCart in cartManager', product)

		product.cartItemNumber = products.length + 1;

		var sku = product.sku.toString();

		return $http.put('/api/cart/' + sku, product)
				.then(function (response) {

					products = response.data;

					return products;

				}, function (error) {
					console.log(error);
				})

	}

	cartManager.removeFromCart = function (cartItemNumber) {

		return $http.delete('/api/cart/' + cartItemNumber)
			.then(function (response) {

				products = response.data;

				return products;

			}, function (error) {
				console.log(error);
			})
	}

	cartManager.getCart = function () {

		return $http.get('/api/cart/')
			.then(function (response) {

				products = response.data;

				return products;

			}, function (err) {
				console.log(err);
			})
	}
	//////////// now we return factory with all pertinent info
	return cartManager;
})