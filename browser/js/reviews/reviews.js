app.config(function ($stateProvider) {

    // Register our *reviews* state.
    $stateProvider.state('reviews', {
        url: '/:item/reviews',
        controller: 'ReviewsController',
        templateUrl: 'js/reviews/reviews.html'
    });

});

app.controller('ReviewsController', function ($scope, Reviews, $stateParams) {
	   Reviews.getAllReviews($stateParams.item)
	   	.then(function(reviews) {
	   		if (reviews.length === 0) {
	   			$scope.reviews = "There are no reviews for this product.";
	   		} else {
	   			$scope.reviews = reviews;	
	   		}
   
    });

});