app.factory('ClothingFactory', function ($http) {

	var clothingFactory = {};
	// clothingFactory.products = {name: 'oh so nice', type: 'shirt'}

	clothingFactory.getProducts = function(categoryType) {
		
		if (!categoryType) {
			return $http
			.get('/api/products')
			.then(function success (products) {
				
				return products.data;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
		}
		else {

			return $http
			.get('/api/products?category=' + categoryType )
			.then(function success (products) {
				
				return products.data;

			}).catch(function (err) {
                throw new Error(err.message);
        	});
		
		}
	}

	clothingFactory.getOneProduct = function(item){
		return $http
			.get('/api/products/' + item)
			.then(function success (product) {

				return product.data;

			}).catch(function (err) {
                throw new Error(err.message);
        });
	}

	clothingFactory.getSearchResults = function() {

		return searchResults;
	}

	clothingFactory.searchProducts = function(searchTerm) {
	
		return $http.get('/api/search/' + searchTerm)
			.then(function(response) {
				searchResults = response.data;

				return searchResults;
			}).catch(function (err) {
                throw new Error(err.message);
        });
	}
	var searchResults =[];


	return clothingFactory;
})