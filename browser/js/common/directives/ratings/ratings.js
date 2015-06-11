app.directive('starRatings', function (clothing) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/ratings/ratings.html',
        link: function (scope) {
            scope.rate = 3;
            scope.max = 5;
            scope.isReadonly = true;
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