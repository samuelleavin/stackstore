app.config(function ($stateProvider) {

    // Register our *bottoms* state.
    $stateProvider.state('bottoms', {
        url: '/bottoms',
        controller: 'BottomsController',
        templateUrl: 'js/bottoms/bottoms.html'
    });

});

app.controller('BottomsController', function ($scope) {


});