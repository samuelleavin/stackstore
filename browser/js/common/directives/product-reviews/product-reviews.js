app.directive('productReviews', function (clothing, Reviews, $stateParams) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/product-reviews/product-reviews.html',
        link: function (scope) {
            Reviews.getAllReviews($stateParams.item).then(function(reviews) {
                scope.reviews = reviews;
            });
        }

    };

});