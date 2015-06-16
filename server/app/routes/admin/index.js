var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

router.get('/products', function(req, res, next) {

	mongoose.model('Product').find({}).exec()
	.then(function(allproducts){
		res.json(allproducts);
	}, function(err){
		res.status(500).send(err.message);
	});
});

router.post('/products', function(req, res, next) { 
	mongoose.model('Product').create(req.body)
		.then(function(newProduct) {
			res.json(newProduct);
		}, function(err) {
			res.status(500).send(err.message);
		});
});

router.post('/productsInventory', function(req, res, next) { 
	console.log(req.body);
	mongoose.model('Inventory').create(req.body).then(function(newInventory) {
		res.json(newInventory);
	}, function (err) {
		res.status(500).send(err.message);
	});
});

// router.put('/products', function(req, res, next) { 
// 	mongoose.model('Product').findOneAndUpdate( {req.query }, { req.body })
// 		.then(function(newProduct) {
// 			res.json(newProduct);
// 		}, function(err) {
// 			res.status(500).send(err.message);
// 		});
// });

// router.delete('/products', function(req, res, next) { 
// 	mongoose.model('Product').findOne(req.body)
// 		.then(function(newProduct) {
// 			res.json(newProduct);
// 		}, function(err) {
// 			res.status(500).send(err.message);
// 		});
// });


router.get('/allUsers', function(req, res, next){
	mongoose.model('User').find({}).exec()
	.then(function(allusers){
		res.send(allusers);
	}, function(err){
		res.status(500).send(err.message);
	});
});

router.put('/makeAdmin/:userEmail', function(req, res, next) {
	
	var userEmail =  req.params.userEmail;
	mongoose.model('User').findOne({email: userEmail}).exec()
		.then(function (foundUser) {
			foundUser.admin = true;
			foundUser.save();
			res.send(foundUser);
		}, next); 
});

router.delete('/deleteUser/:userId', function(req, res, next){

	var userId = req.params.userId;
	mongoose.model('User').remove({_id: userId}).exec()
		.then(function(){
			return mongoose.model('User').find({}).exec()
		})
		.then(function(users){
			res.send(users)
		}, next)

})

router.put('/setUserResetStatus/:userId', function(req, res, next){
	var userId = req.params.userId;

	mongoose.model('User').findById(userId).exec()
		.then(function(foundUser){
			foundUser.reset = true;
			foundUser.save();
			res.send({message: "Password reset triggered!"});
		})
})



router.put('/resetPassword/:userId', function(req, res, next){

	var userId = req.params.userId;
	
	mongoose.model('User').findById(userId).exec()
		.then(function(foundUser){
			foundUser.reset = false;
			foundUser.password = req.body.password; 
			foundUser.save();
			res.send({success: "Successfully changed password, thank you."});
		}, next);
})






