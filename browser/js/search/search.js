app.config(function ($stateProvider) {

    // Register our *search* state.
    $stateProvider.state('search', {
        url: '/search',
        controller: 'SearchController',
        templateUrl: 'js/search/search.html'
    });

});

app.controller('SearchController', function ($scope) {

	$scope.search = {
		results: 'results go here'
	}

});