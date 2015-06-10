app.factory('clothing', function ($http, $resource) {

	var clothingFactory = {};
	clothingFactory.products = {name: 'oh so nice', type: 'shirt'}

	clothingFactory.getProducts = function(categoryType) {
		
		if (!categoryType) {
			return $http
			.get('/api/products')
			.then(function success (products) {
				
				return products.data;

			}, function failure (err) {
				
				console.log(err)
			})
		}
		else {

			return $http
			.get('/api/products?type=' + categoryType )
			.then(function success (products) {
				
				return products.data;

			}, function failure (err) {
				console.log(err)
			})
		}
	}

	clothingFactory.getOneProduct = function(item){
		return $http
			.get('/api/products/' + item)
			.then(function success (product) {

				return product.data;

			}, function failure (err) {

				console.log(err)
			})
	}

	return clothingFactory;
})