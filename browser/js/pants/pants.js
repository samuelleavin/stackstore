app.config(function ($stateProvider) {

    // Register our *pants* state.
    $stateProvider.state('pants', {
        url: '/pants',
        controller: 'PantsController',
        templateUrl: 'js/pants/pants.html'
    });

});

app.controller('PantsController', function ($scope) {


});