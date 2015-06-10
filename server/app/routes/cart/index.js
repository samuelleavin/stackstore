var router = require('express').Router();
var mongoose = require('mongoose');

//	api/cart

router.get('/', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart').exec()
		.then(function (result) {

			res.send(result.shopping_cart)
		}, function (err) {
			
			console.log(err)
		})

	} else if (req.session) {

		res.send(req.session.cart);
	};
});


router.get('/:itemId', function(req, res, next) {
	
	if (req.user) {
		mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
			.then(function (product) {

				req.user.shopping_cart.push(product);
				req.user.save( function (e) {

					if (e) {
						res.status(500).send(e.message);
					} else {
						res.send(req.user.shopping_cart);
					}
				})
				
			}, function (err) {

				res.status(500).send(err.message);
			});

	} //end if for authenticated user
	else {
		mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
		.then(function (product) {

			if (!req.session.cart) {
				req.session.cart = [];
			}

			req.session.cart.push(product);

			req.session.save( function (e) {
				if (e) return res.send(e.message)
			})

			res.send(req.session.cart)

		}, function (err) {
			res.status(500).send(err.message);
		});

	} //end if for anonymous user
});

module.exports = router;