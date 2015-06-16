app.factory('Admin', function ($http, $stateParams) {
	var admin = {};

	admin.getProducts = function() {
		return $http.get('/api/admin/products')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.createProduct = function(product) {
		return $http.post('/api/admin/products', product)
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.createInventory = function(inventory) {
		console.log("hit factory");
		return $http.post('/api/admin/productsInventory', inventory)
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.updateProduct = function() {
		return $http.put('/api/admin/products')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.deleteProduct = function() {
		return $http.delete('/api/admin/products')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.getProduct = function() {
		return $http.get('/api/admin/editProduct/' + $stateParams.item)
		.then(function(response) {
			console.log(response.data);
			return response.data;
		}, function(err) {
			return new Error(err.message);
		});
	};


	return admin;

});