app.factory('clothing', function ($http) {

	var clothingFactory = {};

	clothingFactory.getProducts = function(category) {
		return $http
			.get('ROUTE GOES HERE/' + category)
			.then(function success (products) {
				clothingFactory.products = products;
			}, function failure (err) {
				console.log(err)
			})
	}

	clothingFactory.getTest = function () {
		console.log('getTest was called')
		return {name: 'oh so nice', type: 'shirt'}
	}

	clothingFactory.products = {name: 'oh so nice', type: 'shirt'}



	return clothingFactory;
	
})