app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeController', function ($scope) {

	$scope.myInterval = 3000;
	$scope.slides = ['/images/home/home3.jpg', '/images/home/home1.jpg', '/images/home/home2.jpg', '/images/home/home4.jpg'];

	 // var photos = $scope.photos = {
	 //      image: ['/images/home/home3.jpg', '/images/home/home1.jpg', '/images/home/home2.jpg', '/images/home/home4'],
	 //      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	 //        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	 //    }
	 //  $scope.addSlide = function() {
	 //    //var newWidth = 500 + slides.length + 1;
	 //    slides.push(photos.image[i]);
	 //  };
	 //  for (var i=0; i<4; i++) {
	 //    $scope.addSlide();
	 //  }

});