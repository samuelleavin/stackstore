app.directive('starRatings', function (ClothingFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/ratings/ratings.html',
        link: function (scope) {
            scope.setRating = function() {
                // console.log("SCOPE RATE", scope.rate);
            };

            scope.getRating = function(review) {
                scope.rate = review.star_rating;
                scope.isReadOnly = true;
            };

            scope.max = 5;
            
            scope.ratingStates = [
                {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                {stateOn: 'glyphicon-heart'},
                {stateOff: 'glyphicon-off'}
            ];

            if (scope.review) {
                scope.getRating(scope.review);
            }
            
        }

    };

});
