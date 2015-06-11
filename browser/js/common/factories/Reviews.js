app.factory('Reviews', function ($http) {

    var reviews = {};

    reviews.getAllReviews = function(item) {
        return $http.get('/api/products/' + item + '/reviews')
            .then(function (response) {
                console.log("reviews", reviews);
                reviews = response.data;
                return reviews;
            }, function (err) {
                console.log(err);
            });
    };

    return reviews;
});