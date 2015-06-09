app.config(function ($stateProvider) {

    // Register our *tops* state.
    $stateProvider.state('tops', {
        url: '/tops',
        controller: 'TopsController',
        templateUrl: 'js/tops/tops.html'
    });

});

app.controller('TopsController', function ($scope) {


});