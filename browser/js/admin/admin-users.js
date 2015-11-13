// substate - user management

app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminUsers', {
       url: '/users',
       controller: 'AdminUsersController',
       templateUrl: 'js/admin/admin-users.html'
   });

});

app.controller('AdminUsersController', function ($scope, AdminUserFactory) {
  
  AdminUserFactory.getUsers().then(function(results){
  	$scope.users = results;
  	}, function (err) {
        console.error(err);
    });

  	$scope.adminStatus = function(user) {
  
  		$scope.user = user; 
  		AdminUserFactory.changeUserAdminStatus(user.email)
  		.then(function(newAdmin){
  			$scope.user.admin = newAdmin.admin;
  
  		}, function (err) {
        console.error(err);
    	});
  	}	
  	$scope.deleteUser = function(user) {
 		
  		AdminUserFactory.adminDeleteUser(user._id)
  		.then(function(remainingUsers){
  			$scope.users = remainingUsers;
  		}, function (err) {
          console.error(err);
    	});
  	}

  	$scope.passwordReset = function(user) {
  		
  		AdminUserFactory.setUserResetStatus(user)
      .then(function(response){
          $scope.trigger = response.message;
      }, function (err) {
          console.error(err);
      });

  	}


});
