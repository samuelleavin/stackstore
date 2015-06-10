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
		}, function (err) {

			next(err);
		})

	} else if (req.session) {

		res.send(req.session.cart);
	};
});


router.post('/:itemId', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart').exec()
		.then(function (foundUser) {

			mongoose.model('Product')
			.findOne({sku: req.params.itemId}).exec()
			.then(function (foundProduct) {

				console.log(foundProduct);

				foundUser.shopping_cart.push(foundProduct);
				foundUser.save(function (error) {

					if (error) return next(error);
					res.send(foundUser.shopping_cart);
				})
			}, function (error) {
				next (error);
			})

		}, function (err) {

			next(err);
		})

	} //end if for authenticated user
	else {

		mongoose.model('Product').findOne({ sku: req.params.itemId }).exec()
		.then(function (product) {

			if (!req.session.cart) {
				req.session.cart = [];
			}

			req.session.cart.push(product);

			req.session.save( function (e) {
				if (e) return res.send(e.message);
			})

			res.send(req.session.cart);

		}, function (err) {
			res.status(500).send(err.message);
		});

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

			currentUser.save(function (e) {
				if (e) {return next(e)};
				
				// res.send(currentUser.shopping_cart)
				console.log('post', currentUser.shopping_cart);
			})

		}, function (err) {
			
			next(err);
		})

	} else if (req.session) {

		// res.send(req.session.cart);
	};
});

module.exports = router;