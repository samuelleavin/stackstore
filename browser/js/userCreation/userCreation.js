app.config(function ($stateProvider) {

    $stateProvider.state('userCreation', {
        url: '/userCreation',
        controller: 'UserCreationController',
        templateUrl: 'js/userCreation/userCreation.html'
    });

});

app.controller('UserCreationController', function ($state, $timeout, $scope, UserCreation, AuthService) {

	var newUser;
	$scope.user = newUser = {}; 



	$scope.registerUser = function(user) {
		if(user.password === user.passwordCheck){
			
			UserCreation.validate(user)
			.then(function (results) {
				var modUser = {email: user.email, password: user.password};
				$scope.success = results.message;

				var onSuccess = function () {
					$state.go('home')
				}

				AuthService.login(modUser);
				$timeout(onSuccess, 2000);

			})
			.catch(function () {
	            $scope.error = 'User already exists.';
	        });
		} //end if
	} //end function



});