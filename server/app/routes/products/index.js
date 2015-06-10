var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	mongoose.model('Product').find({}).exec()
	.then(function(allproducts){
		res.json(allproducts);
	}, function(err){
		res.status(500).send(err.message);
	});
});


router.get('/item/:itemId', function(req, res, next) { //api/products/123

	mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
	.then(function(product) {
		res.json(product);
	}, function(err) {
		res.status(500).send(err.message);
	});

});

router.get('/category/:categoryType', function(req, res, next) { //api/products/category/Tops
	console.log(req.params.categoryType)
	
	mongoose.model('Product').find({ type: req.params.categoryType }).exec()
	.then(function(products) {
		res.json(products);
	}, function(err) {
		res.status(500).send(err.message);
	});

});

module.exports = router;

/*
router.get('/addtoCart/:itemid', f(){
	req.session.cart.push()
})
*/
