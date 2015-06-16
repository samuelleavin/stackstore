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
			product_sku: null,
			small: [],
			medium: [],
			large: [],
			xlarge: []
	};

	console.log($scope.newInventorySku);



	$scope.addToInventory = function () {
		var size = $scope.newInventorySize[0];
		$scope.inventory[size].push({
			color: $scope.newInventoryColor,
		 	quantity: $scope.newInventoryQuantity
		});
		$scope.inventory["product_sku"] = $scope.newInventorySku;


		console.log($scope.inventory);
		$scope.newInventoryColor = null;
		$scope.newInventoryQuantity = null;
		$scope.newInventorySize = null;
	};

	$scope.submitNewProduct = function (newProduct) {
		console.log("new product", newProduct);
		console.log("inventory", $scope.inventory);
		Admin.createInventory($scope.inventory)
		.then(
			function (newInventory) {

				$scope.newProduct.inventory = newInventory._id;
				console.log("new product after setting inv", newProduct);
				return newInventory;
			}, 
			function(err) {
				throw new Error();
			})
		.then(
			function() {
				Admin.createProduct($scope.newProduct)
				.then(
					function (newProduct) {
						console.log("product", newProduct);
						return newProduct;
					}, 
					function(err) {
						throw new Error();
					});
			}
	)};
  
});