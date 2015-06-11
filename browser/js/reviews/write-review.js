app.config(function ($stateProvider) {

    // Register our *reviews* state.
    $stateProvider.state('writeReview', {
        url: '/:item/write-review',
        controller: 'WriteReviewController',
        templateUrl: 'js/reviews/write-review.html'
    });

});

app.controller('WriteReviewController', function ($scope, Reviews, $stateParams) {
	   Reviews.getAllReviews($stateParams.item)
	   	.then(function(reviews) {
        	$scope.reviews= reviews;
    });

});