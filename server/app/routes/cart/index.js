var router = require('express').Router();
var mongoose = require('mongoose');

//	api/cart

router.get('/', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart').exec()
		.then(function (result) {

			res.send(result.shopping_cart);
		}, next)

	} else if (req.session) {

		res.send(req.session.cart);
	};
});


router.put('/:itemId', function(req, res, next) {
	
	if (req.user) {

		var userId = req.user._id, sku =  req.params.itemId;

		mongoose.model('User').addToCartBySku(userId, sku, next)
			.then(function (userCart) {

				res.send(userCart);
			}, next);

	} //end if for authenticated user
	else {

		mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
		.then(function (product) {

			if (!req.session.cart) {
				req.session.cart = [];
			}

			req.session.cart.push(product);

			req.session.save(next)

			res.send(req.session.cart);

		}, next);

	} //end if for anonymous user
});

router.delete('/:itemId', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart')
		.exec()
		.then(function (currentUser) {

			console.log('prev',currentUser.shopping_cart)

			currentUser.shopping_cart.pull({sku: req.params.itemId});

			currentUser.save(next)

		}, next)

	} else if (req.session) {

		// res.send(req.session.cart);
	};
});

module.exports = router;