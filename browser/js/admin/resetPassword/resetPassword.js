app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('resetPassword', {
       url: '/resetPassword',
       controller: 'AdminPasswordResetController',
       templateUrl: 'js/admin/resetPassword/resetPassword.html'
   });

});

app.controller('AdminPasswordResetController', function ($timeout, $state, $scope, AdminUserFactory, AuthService) {
  
  $scope.user = {};

  $scope.resetPassword = function(user) {

      AuthService.getLoggedInUser().then(function(userId){
        if(user.password === user.passwordCheck){
          AdminUserFactory.adminResetUserPassword(userId, user)
            .then(function (response) {
  
                $scope.success = response.success;

                var onSuccess = function () {
                $state.go('home')
                }

                $timeout(onSuccess, 2000);
            }).catch(function () {
                $scope.error = 'Sorry you broke the backend, please try again later.';
            });
          } else {
          $scope.error = 'Password doesn\'t match.'
          }
      })
    }
});