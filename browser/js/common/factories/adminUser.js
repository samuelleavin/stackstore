app.factory('AdminUserFactory', function ($http) {
	var admin = {};
	
	admin.getUsers = function() {
		return $http.get('/api/admin/allUsers')
			.then(function(response) {
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	};

	admin.changeUserAdminStatus = function(userEmail) {
		return $http.put('/api/admin/makeAdmin/' +userEmail)
			.then(function(response){
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	}

	admin.adminDeleteUser = function(userId) {
		return $http.delete('/api/admin/deleteUser/'+userId)
			.then(function(response){
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	}

	admin.setUserResetStatus = function(user) {

		return $http.put('/api/admin/setUserResetStatus/'+user._id)
			.then(function(response){
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	}


	admin.adminResetUserPassword = function(userId, passwords) {
		
		return $http.put('/api/admin/resetPassword/'+userId._id, passwords)
			.then(function(response){
				
				return response.data;
			}, function(err) {
				return new Error(err.message);
			});
	}

	return admin;

});