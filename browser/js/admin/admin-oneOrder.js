app.config(function ($stateProvider) {

   // Register our *product-item* state.
   $stateProvider.state('adminMain.oneOrder', {
       // url: '/products/:item/:sku/:price',
       url: '/orders/:orderId',
       controller: 'AdminOneOrderController',
       templateUrl: 'js/admin/admin-oneOrder.html'
   });

});

app.controller('AdminOneOrderController', function ($scope, AdminOrder, $stateParams) {

	AdminOrder.getOneOrder($stateParams.orderId)
	.then(function(order) {
		$scope.order = order;
	});

	$scope.changeOrderStatus = function(order) {
		// AdminOrder.changeStatus($stateParams.orderId, order) = {
		// 	$state.go('editOrder');
		// }
	}
});
