app.directive('productReviews', function (clothing) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/product-reviews/product-reviews.html',
        link: function (scope) {
            scope.reviews = [ { author: 'Cat', comment: 'This dress is THE BEST! I highly recommend! Perfect for petite women.' }, { author: 'Kara', comment: 'This dress looks SO good on me! I love the fit!'} ]; // ReviewFactory.getAllReviews()
            scope.rate = 7;
            scope.max = 10;
            scope.isReadonly = true;

            // scope.hoveringOver = function(value) {
            //     scope.overStar = value;
            //     scope.percent = 100 * (value / scope.max);
            // };

            scope.ratingStates = [
                {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                {stateOn: 'glyphicon-heart'},
                {stateOff: 'glyphicon-off'}
            ];
        }

    };

});