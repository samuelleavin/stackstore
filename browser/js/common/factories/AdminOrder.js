app.factory('AdminOrder', function ($http) {
	var adminOrder = {};

	adminOrder.getOrders = function() {
		return $http.get('/api/admin/orders')
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};
	
	adminOrder.getOneOrder = function(orderId) {
		return $http.get('/api/admin/orders/' + orderId)
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};

	adminOrder.changeOrderStatus = function(orderId) {
		return $http.get('/api/admin/orders/' + orderId + '/edit')
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};

	adminOrder.updateOrderStatus = function(orderId, order) {
		return $http.put('/api/admin/orders/' + orderId + '/edit', order)
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};

	return adminOrder;

});
