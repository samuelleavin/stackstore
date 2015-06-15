app.factory('clothing', function ($http) {

	var clothingFactory = {};
	// clothingFactory.products = {name: 'oh so nice', type: 'shirt'}

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
			.get('/api/products?category=' + categoryType )
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

	clothingFactory.getSearchResults = function() {

		return searchResults;
	}

	clothingFactory.searchProducts = function(searchTerm) {

		return $http.get('/api/search/' + searchTerm)
			.then(function(response) {
				searchResults = response.data;

				return searchResults;
			}, function(err) {
				console.log(err);
			})
	}

	var searchResults =[];

	return clothingFactory;
})