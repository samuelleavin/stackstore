app.factory('clothing', function ($http) {

	var clothingFactory = {};
	clothingFactory.products = {name: 'oh so nice', type: 'shirt'}

	clothingFactory.getProducts = function(category) {
		return $http
			.get('/api/products')
			.then(function success (products) {
				console.log("products", products.data);
				return products.data;
			}, function failure (err) {
				console.log(err)
			})
	}

	clothingFactory.getTest = function () {
		console.log('getTest was called')
		return {name: 'oh so nice', type: 'shirt'}
	}



	return clothingFactory;
	
})