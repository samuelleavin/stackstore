app.config(function ($stateProvider) {

    // Register our *clothing* state.
    $stateProvider.state('clothing', {
        url: '/clothing',
        controller: 'ClothingController',
        templateUrl: 'js/clothing/clothing.html'
    });

});

app.controller('ClothingController', function ($scope, clothing) {

});