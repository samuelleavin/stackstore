var router = require('express').Router();
var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');

//	api/cart

router.get('/', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		// .populate('shopping_cart')
		.exec()
		.then(function (user) {

			console.log(user)


			//reg user has added items anonymously so add to account cart
			if (req.session.cart) {
				req.session.cart.forEach(function (anonItem) {
					// user.shopping_cart.unshift(_.create(anonItem));
					user.shopping_cart.unshift(anonItem);
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

	var itemToSell = req.body;
	var itemSku =  req.params.itemId;

	console.log(itemToSell)
	
	if (req.user) {

		var userId = req.user._id; 

		mongoose.model('User').addToCartBySku(userId, itemToSell, next)
			.then(function (userCart) {

				res.send(userCart);
			}, next);
 
	} //end if for authenticated user
	else {

		if (!req.session.cart) {
			req.session.cart = [];
		}

		// req.session.cart.push(_.create(product));

		req.session.cart.push(itemToSell);

		req.session.save(next)

		res.send(req.session.cart);
/*
		mongoose.model('Product')
		.findOne({ sku: itemSku })
		.populate('inventory')
		.exec()
		.then(function (product) {



		}, next);
*/
	} //end if for anonymous user
});

router.delete('/:cartItemNumber', function(req, res, next) {

	console.log('in cart/delete route',req.params)
	
	var cartItemToRemove = Number(req.params.cartItemNumber);
	
	if (req.user) {

		var userPromise = mongoose.model('User')
			.findById(req.user._id)
			// .populate('shopping_cart')
			.exec();

/*		var productPromise = mongoose.model('Product')
			.findOne({sku: skuToRemove})
			.exec();*/

		Q.all([userPromise])//, productPromise])
		.then(function (results) {

			var currentUser = results[0]//, item = results[1];

			// currentUser.shopping_cart.pull(item);

			currentUser.shopping_cart.forEach( function (item) {
				if (item.cartItemNumber === cartItemToRemove) {
					currentUser.shopping_cart.pop(item);
				};
			})

			currentUser.save(function (err, data) {
				if (err) return next(err);

				mongoose.model('User')
				.findById(req.user._id)
				// .populate('shopping_cart')
				.exec()
				.then(function (updatedUser) {

					res.send(updatedUser.shopping_cart);
					
				}, next)

			})
		
		}, next)

	} else if (req.session) {

		var userCart = req.session.cart

		req.session.cart = _.filter(userCart, function (ele) {
	
			return ele.cartItemNumber !== Number(cartItemToRemove)
		})
	
		res.send(req.session.cart);
	};
});

module.exports = router;
