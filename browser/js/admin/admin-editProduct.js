//substate of admin-products state
app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminEditProduct', {
       url: '/edit-products/:item',
       controller: 'AdminEditProductController',
       templateUrl: 'js/admin/admin-editProduct.html'
   });

});

app.controller('AdminEditProductController', function ($scope, $stateParams, Admin) {
	
	Admin.getProduct().then(function (product) {
		$scope.product = product;
	}, function (err) {
		console.log(err);
	});	

	$scope.removePhoto = function(photoIndex) {
		$scope.product.photos.search = [];//$scope.product.photos.search() = [];
	}

	$scope.addPhoto = function() {
		document.getElementById('newFilePhoto').files[0];
	}

	$scope.removeCategory = function(){
		$scope.product.category = "";
		console.log($scope.product);
	}

});