
app.factory('UserCreation', function ($http, $q) {
	var creation = {};

	creation.validate = function (user) {

		return $http.post('/api/UserCreation', user)
		.then(function (response) {

			return response.data;
		})
		.catch(function (response) {

            return $q.reject({ message: 'User already exists.' });
        });

	}

	return creation;

});
