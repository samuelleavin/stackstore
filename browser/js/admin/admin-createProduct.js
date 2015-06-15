//substate of admin-products state
app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.adminCreateProduct', {
       url: '/add-products',
       controller: 'AdminCreateProductController',
       templateUrl: 'js/admin/admin-createProduct.html'
   });

});

app.controller('AdminCreateProductController', function ($scope, Admin) {

	$scope.inventory = {
			small: [],
			medium: [],
			large: [],
			xlarge: []
	};



	$scope.addToInventory = function () {
		var size = $scope.newInventorySize[0];
		$scope.inventory[size].push({
			color: $scope.newInventoryColor,
		 	quantity: $scope.newInventoryQuantity
		});

		console.log($scope.inventory);

		$scope.newInventoryColor = null;
		$scope.newInventoryQuantity = null;
		$scope.newInventorySize = null;
	};

	$scope.submitNewProduct = function (newProduct) {

		Admin.createInventory($scope.inventory)
		.then(
			function (newInventory) {
				return newInventory;
			}, 
			function(err) {
				throw new Error();
			})
		.then(
			function() {
				Admin.createProduct(newProduct)
				.then(
					function (newProduct) {
						return newProduct;
					}, 
					function(err) {
						throw new Error();
					});
			}
	)};
  
});