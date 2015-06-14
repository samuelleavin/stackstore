app.factory('Account', function ($http) {
	var account = {};

	account.getOrders = function() {
		return $http.get('/api/account/orderHistory')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};


	return account;

});