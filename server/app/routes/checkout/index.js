var router = require('express').Router();
var mongoose = require('mongoose');

//	api/checkout

router.get('/', function(req, res, next) {
	
	if (req.user) {

		mongoose.model('User')
		.findById(req.user._id)
		.populate('shopping_cart').exec()
		.then(function (user) {  
			res.send(user.shopping_cart);
		}, next)

	} else if (req.session) {

		res.send(req.session.cart);
	};
});

router.post('/', function(req, res, next) {
	console.log("this is from the router", req.session.passport.user)
	if (req.user) {
    	mongoose.model('Order').create(req.body, function(err, order){
    		if(err) return next(err);
    		console.log("you posted!", req.user)
    		res.send({message: "Thank you for your purchase!"})
    	})

    } else {
    	res.send({message: "Thank you for your purchase!"})
    }

});


module.exports = router;
