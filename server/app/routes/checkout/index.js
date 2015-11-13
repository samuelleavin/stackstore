var router = require('express').Router();
var mongoose = require('mongoose');

//	api/checkout

router.post('/', function(req, res, next) {

	if (req.user) {

		    var userId = req.session.passport.user, userInfo = req.body.userInfo,
		    	cartInfo = req.body.cartInfo;  

		   	mongoose.model('Order').addToUsersOrderHistory(userId, userInfo, cartInfo, next)
		   		.then(function(updatedUser){
    				res.send({message: "Thank you for your purchase!"})
		   		}, next)
		   		
    } else {
    	var customerInfo = req.body.customerInfo, 
    		userInfo = req.body.userInfo, 
    		cartInfo = req.body.cartInfo; 
    		
    	mongoose.model('Order').create({name: customerInfo.name, shipping_address: userInfo, products: cartInfo})
    	.then(function(results){
    		req.session.cart = [];
    		res.send({message: "Thank you for your purchase!"})
    	}, next)

    }

});


module.exports = router;
