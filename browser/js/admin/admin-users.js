// substate - user management

app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminUsers', {
       url: '/users',
       controller: 'AdminUsersController',
       templateUrl: 'js/admin/admin-users.html'
   });

});

app.controller('AdminUsersController', function ($scope) {
  
});