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
	console.log("hit route");
	console.log("req body", req.body);
	mongoose.model('Product').create(req.body)
		.then(function(newProduct) {
			res.json(newProduct);
		}, function(err) {
			res.status(500).send(err.message);
		});
});

router.post('/productsInventory', function(req, res, next) { 
	console.log(req.body);
	mongoose.model('Inventory').create(req.body) .then(function(newInventory) {
		res.json(newInventory);
	}, function (err) {
		res.status(500).send(err.message);
	});
});

router.get('/editProduct/:itemId', function(req, res) {
    mongoose.model('Product').findOne({ sku: req.params.itemId}).exec().then(function(foundProduct) {
    		console.log(foundProduct);
    		res.json(foundProduct);
    	}, function (err) {
    		res.status(500).send(err.message);
    });
});

// router.post('/editProduct', function(req, res) {

// });

// router.delete('/products', function(req, res, next) { 
// 	mongoose.model('Product').findOne(req.body)
// 		.then(function(newProduct) {
// 			res.json(newProduct);
// 		}, function(err) {
// 			res.status(500).send(err.message);
// 		});
// });