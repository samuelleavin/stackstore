// substate - order management

app.config(function ($stateProvider) {

   $stateProvider.state('adminMain.adminOrders', {
       // url: '/products/:item/:sku/:price',
       url: '/orders',
       controller: 'AdminOrdersController',
       templateUrl: 'js/admin/admin-orders.html',
       resolve: {
       		orders: function(AdminOrder) {
       			return AdminOrder.getOrders();
       		}
       }
   });

});

app.controller('AdminOrdersController', function ($scope, AdminOrder, orders, $state) {

	$scope.orders = orders;

	$scope.currentStatus = 'All';

	$scope.setStatus = function(status) {
		$scope.currentStatus = status;
	};

	$scope.orderStatuses = [ 'All', 'Created', 'Processing', 'Completed', 'Cancelled' ];

	$scope.getOneOrder = function() {
		var orderId = this.order._id;
		$state.go('adminMain.oneOrder', { orderId: orderId });
	};
});


app.filter('orderFilter', function () {
	console.log('hit filter');
    return function (orders, status) {
		status = status.toLowerCase();

		if (status === "all") {

			return orders;

		} else {
			var filtered = [];

			for (var i = 0; i < orders.length; i++) {

				var order = orders[i];

				if (order.status[status]) {
					filtered.push(order);
				}
			}
			return filtered;
		}
    };
});
