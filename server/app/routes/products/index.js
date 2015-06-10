var router = require('express').Router();
var mongoose = require('mongoose');


// api/products/
router.get('/', function(req, res, next) {

	mongoose.model('Product').find(req.query).exec()
	.then(function(allproducts){

		res.json(allproducts);
	}, function(err){
		res.status(500).send(err.message);
	});
});

//api/products/123
router.get('/:itemId', function(req, res, next) { 

	mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
	.then(function(product) {
		res.json(product);
	}, function(err) {
		res.status(500).send(err.message);
	});

});

module.exports = router;
