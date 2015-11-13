app.factory('Reviews', function ($http) {

    var reviews = {};

    reviews.getAllReviews = function(item) {
        return $http.get('/api/products/' + item + '/reviews')
            .then(function (response) {
                // reviews = response.data;
                // return reviews;
                return response.data;
            }).catch(function (err) {
                throw new Error(err.message);
        });
    };

    reviews.createReview = function(item, newReview) {
        return $http.post('/api/products/' + item + '/reviews', newReview)
            .then(function (response) {
                return response.data;
            }).catch(function (err) {
                throw new Error(err.message);
        });
    };

    return reviews;
});
