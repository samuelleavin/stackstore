app.factory('AdminPromo', function ($http) {
	var adminPromo = {};

	var currentPromo = {};

	adminPromo.getPromos = function() {
		return $http.get('/api/promo')
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};
	
	adminPromo.getOnePromo = function(code) {
		console.log("hit one promo factory");
		return $http.get('/api/promo/' + code)
			.then(function(response) {
				currentPromo = response.data;
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};

	adminPromo.assignCurrentPromo = function(promo) {
		currentPromo = promo;
	};

	adminPromo.getCurrentPromo = function () {
		return currentPromo;
	};


	adminPromo.updatePromo = function(promo) {
		return $http.put('/api/promo', promo)
			.then(function(response) {
				return response.data;
			})
			.catch(function(err) {
				throw new Error(err.message);
			});
	};

	adminPromo.createPromo = function(promo) {
		return $http.post('/api/promo', promo)

		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			throw new Error(err.message);
		});
	};

	adminPromo.deletePromo = function(promo) {
		return $http.delete('/api/promo', promo)
		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			throw new Error(err.message);
		});
	};


	return adminPromo;

});

		// adminPromo.editPromo = function(code) {
	// 	return this.getOnePromo(code)
	// 	.then(function(promo) {
	// 		return .data;
	// 	})
	// 	.catch(function(err) {
	// 		throw new Error(err.message);
	// 	});
	// };


