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

router.get('/:itemId/reviews/', function(req, res, next) { //api/products/123/reviews

	mongoose.model('Review').find({ product_sku: req.params.itemId }).exec()
	.then(function(reviews) {
		res.json(reviews);
	}, function(err) {
		res.status(500).send(err.message);
	});

});

router.post('/:itemId/reviews', function(req, res, next) { //api/products/123/reviews

	req.body.product_sku = req.params.itemId;
	console.log("req body", req.body);
	mongoose.model('Review').create(req.body)
		.then(function(newReview) {
			res.json(newReview);
		}, function(err) {
			res.status(500).send(err.message);
		});

});



/*router.get('/category/:categoryType', function(req, res, next) { //api/products/category/Tops
	console.log(req.params.categoryType);
	
	mongoose.model('Product').find({ type: req.params.categoryType }).exec()
	.then(function(products) {
		res.json(products);
	}, function(err) {
		res.status(500).send(err.message);
	});

});*/

module.exports = router;
///////////////////////////
