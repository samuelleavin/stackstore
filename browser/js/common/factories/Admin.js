app.factory('Admin', function ($http) {
	var admin = {};

	admin.getProducts = function() {
		return $http.get('/api/admin/products')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.createProduct = function() {
		return $http.post('/api/admin/products')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.createInventory = function() {
		return $http.post('/api/admin/productsInventory')
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


	return admin;

});