app.factory('Reviews', function ($http) {

    var reviews = {};

    reviews.getAllReviews = function(item) {
        return $http.get('/api/products/' + item + '/reviews')
            .then(function (response) {
                // reviews = response.data;
                // return reviews;
                return response.data;
            }, function (err) {
                console.log(err);
            });
    };

    reviews.createReview = function(item, newReview) {
        return $http.post('/api/products/' + item + '/reviews', newReview)
            .then(function (response) {
                console.log("response data", response.data);
                return response.data;
            }, function (err) {
                console.log(err);
            });
    };

    return reviews;
});