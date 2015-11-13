app.config(function ($stateProvider) {

    // Register our *reviews* state.
    $stateProvider.state('writeReview', {
        url: '/:item/write-review',
        controller: 'WriteReviewController',
        templateUrl: 'js/reviews/write-review.html'
    });

});

app.controller('WriteReviewController', function ($scope, Reviews, $stateParams) {


   $scope.createReview = function(review) {
        $scope.newReview.star_rating = $scope.rate;
        Reviews.createReview($stateParams.item, $scope.newReview).then(function (postedReview) {
            console.log("success in createReview");
        });
    };


});
