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


router.get('/:categoryType', function(req, res, next) {
	mongoose.model('Product').find({ type: req.params.categoryType }).exec()
	.then(function(product) {
		res.json(product);
	}, function(err) {
		res.status(500).send(err.message);
	});

});

module.exports = router;