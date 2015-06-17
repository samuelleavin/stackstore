app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.promocodes', {
       url: '/promo',
       controller: 'promocodesController',
       templateUrl: 'js/admin/admin-promo/admin-promo-home.html'
   });

});

app.controller('promocodesController', function ($scope, Admin) {
    
});