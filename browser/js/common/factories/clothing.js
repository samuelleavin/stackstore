app.factory('clothing', function ($http) {

	var clothingFactory = {};
	var searchResults = [];
	var currentProduct = {};
	var sizeArray = ['small', 'medium', 'large', 'xlarge'];

	function analyzeProduct (product) {

		var modProd = {};

		modProd.sku = product.sku;
		modProd.sizes = [];
		modProd.colors = [];

		for (var i = 0; i < sizeArray.length; i++ ) {

            if (product.inventory[sizeArray[i]][0].quantity !== 0) {
                modProd.sizes.push(sizeArray[i])
                modProd.colors.push(product.inventory[sizeArray[i]][0].color)
            };
        }

        return modProd;
	};

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
			.then(function success (response) {

				currentProduct = analyzeProduct(response.data);

				return response.data;

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


	clothingFactory.availableSizes = function () {
		return sizeArray;
	}

	clothingFactory.availableColors = function () {
		return currentProduct.colors;
	}

	clothingFactory.getCurrent = function () {
		return currentProduct;
	}

	return clothingFactory;
})
