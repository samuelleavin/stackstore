var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

router.get('/products', function(req, res, next) {

	mongoose.model('Product').find({}).exec()
	.then(function(allproducts){
		res.json(allproducts);
	}, function(err){
		res.status(500).send(err.message);
	});
});

router.post('/products', function(req, res, next) { 
	mongoose.model('Product').create(req.body)
		.then(function(newProduct) {
			res.json(newProduct);
		}, function(err) {
			res.status(500).send(err.message);
		});
});

// router.put('/products', function(req, res, next) { 
// 	mongoose.model('Product').findOneAndUpdate( {req.query }, { req.body })
// 		.then(function(newProduct) {
// 			res.json(newProduct);
// 		}, function(err) {
// 			res.status(500).send(err.message);
// 		});
// });

// router.delete('/products', function(req, res, next) { 
// 	mongoose.model('Product').findOne(req.body)
// 		.then(function(newProduct) {
// 			res.json(newProduct);
// 		}, function(err) {
// 			res.status(500).send(err.message);
// 		});
// });
//
router.get('/orders', function(req, res, next) {
	console.log("hit get all orders route");
	mongoose.model('Order').find({}).populate('customer').exec()
	.then(function(allOrders){
		allOrders.forEach(function (order) {
			order.customer = _.pick(order.customer.email);
			
		});
		console.log("all orders", allOrders);
		res.json(allOrders);
	}, function(err){
		res.status(500).send(err.message);
	});
});

router.get('/orders/:orderId', function(req, res, next) {
	console.log("hit individual order route");
	mongoose.model('Order').findOne({ _id: req.params.orderId }).exec()
	.then(function(order){
		res.json(order);
	}, function(err){
		res.status(500).send(err.message);
	});
});

router.get('/orders/:orderId/edit', function(req, res, next) {
	console.log("hit edit order route");
	mongoose.model('Order').findById(req.params.orderId).exec()
		.then(function(order) {
			res.send(order);
		}, function(err){
			res.status(500).send(err.message);
		});
});

router.put('/orders/:orderId/edit', function(req, res, next) {
	var editedOrder = req.body;
	console.log("hit edit order put route");
	mongoose.model('Order').findByIdAndUpdate(req.params.orderId, editedOrder).exec()
		.then(function(updatedOrder) {
			res.send(updatedOrder);
		}, function(err){
			res.status(500).send(err.message);
		});
});

