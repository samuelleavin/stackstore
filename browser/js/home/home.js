app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeController', function ($scope) {

	$scope.myInterval = 3000;
	$scope.slides = ['/images/home/home3.jpg', '/images/home/home1.jpg', '/images/home/home2.jpg', '/images/home/home4.jpg'];
});