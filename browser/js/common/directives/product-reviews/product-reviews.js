app.directive('productReviews', function (ClothingFactory, Reviews, $stateParams) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-reviews/product-reviews.html',
        link: function (scope) {
            Reviews.getAllReviews($stateParams.item).then(function(reviews) {
                scope.reviews = reviews;
            });
        }

    };

});