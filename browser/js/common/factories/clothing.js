app.factory('clothing', function ($http) {

	var clothingFactory = {};
	clothingFactory.products = {name: 'oh so nice', type: 'shirt'}

	clothingFactory.getProducts = function(categoryType) {
		if (!categoryType) {
			return $http
			.get('/api/products')
			.then(function success (products) {
				console.log("products", products.data);
				return products.data;
			}, function failure (err) {
				console.log(err)
			})
		}
		else {
			return $http
			.get('/api/products/category/' + categoryType )
			.then(function success (products) {
				console.log("products", products.data);
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
				console.log("product", product.data);
				return product.data;
			}, function failure (err) {
				console.log(err)
			})
	}

	return clothingFactory;
	
})