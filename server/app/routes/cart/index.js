var router = require('express').Router();
var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');

//	api/cart

router.get('/', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart').exec()
		.then(function (user) {

			if (req.session.cart) {
				req.session.cart.forEach(function (anonItem) {
					user.shopping_cart.unshift(_.create(anonItem));
				})

				user.save(next);
				delete req.session.cart;
			};

			res.send(user.shopping_cart);
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

		mongoose.model('Product')
		.findOne({ sku: req.params.itemId })
		.populate('inventory')
		.exec()
		.then(function (product) {

			if (!req.session.cart) {
				req.session.cart = [];
			}

			req.session.cart.push(_.create(product));

			req.session.save(next)

			res.send(req.session.cart);

		}, next);

	} //end if for anonymous user
});

router.delete('/:itemId', function(req, res, next) {
	
	var skuToRemove = req.params.itemId;
	
	if (req.user) {

		var userPromise = mongoose.model('User')
			.findById(req.user._id)
			.populate('shopping_cart')
			.exec();

		var productPromise = mongoose.model('Product')
			.findOne({sku: skuToRemove})
			.exec();

		Q.all([userPromise, productPromise])
		.then(function (results) {

			var currentUser = results[0], item = results[1];

			currentUser.shopping_cart.pull(item);

			currentUser.save(function (err, data) {
				if (err) return next(err);

				mongoose.model('User')
				.findById(req.user._id)
				.populate('shopping_cart').exec().then(function (updatedUser) {

					res.send(updatedUser.shopping_cart);
					
				}, next)

			})
		
		}, next)

	} else if (req.session) {

		var userCart = req.session.cart

		req.session.cart = _.filter(userCart, function (ele) {
	
			return ele.sku !== Number(skuToRemove)
		})
	
		res.send(req.session.cart);
	};
});

module.exports = router;
