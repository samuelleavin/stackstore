app.factory('cart', function ($http, AuthService) {
	var cart = {};
	var products = [];

	cart.addToCart = function (productId) {

		return $http.get('/api/cart/' + productId)
			.then(function (response) {

				// response.data.quantity = 1;

				// console.log(response.data);
				console.log('this is repsonse for addition', response)
				products = products.concat(response.data);
				return products;
				
			}, function (error) {
				console.log(error);
			})
	}

	cart.removeFromCart = function (productId) {
		var itemToRemove, tmp;

		// return $http.delete()

		// if (products.length === 0) return;

		// return products.filter(function (ele) {
		// 	console.log(ele);

		// 	if (!ele.sku) return true;

		// 	return (ele.sku !== productId);
		// })


	}

	cart.getCart = function () {

		return $http.get('/api/cart/')
			.then(function (response) {
				
				for (var i = 0; i < response.data.length; i++) {
					products.push(response.data[i])
				}
				
				return products;

			}, function (err) {
				console.log(err);
			})
	}
	//////////// now we return factory with all pertinent info
	return cart;
})