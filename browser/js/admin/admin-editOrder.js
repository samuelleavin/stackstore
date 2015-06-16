app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.editOrder', {
       // url: '/products/:item/:sku/:price',
       url: '/orders/:orderId/edit',
       controller: 'AdminEditOrderController',
       templateUrl: 'js/admin/admin-oneOrder.html'
   });

});

app.controller('AdminEditOrderController', function ($scope, AdminOrder, $stateParams, $state) {

	AdminOrder.changeOrderStatus($stateParams.orderId)
	.then(function(order) {
		$scope.order = order;
	});

	$scope.updateOrderStatus = function(order) {
		AdminOrder.updateOrderStatus($stateParams.orderId, order).then(function(updatedOrder) {
			console.log("posted update? in controller");
			$state.go('adminMain.AdminOrder');
		});
			
	};

});