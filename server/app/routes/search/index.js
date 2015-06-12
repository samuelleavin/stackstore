var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/:searchTerm', function(req, res, next) {
	var searchTerm = req.params.searchTerm;

	var searchQuery = {
		'$or': [
			{'category': {'$regex': searchTerm, '$options': 'i'}},
			{'type': {'$regex': searchTerm, '$options': 'i'}},
			{'name': {'$regex': searchTerm, '$options': 'i'}}
		]
	};
	
	mongoose.model('Product').find(searchQuery).exec()
		.then(function(allproducts){
			res.send(allproducts);
		}, function(err){
			res.status(500).send(err.message);
	});
	
});

module.exports = router;