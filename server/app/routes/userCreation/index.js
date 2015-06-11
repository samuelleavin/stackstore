var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;


router.post('/', function (req, res, next) {
	var userToMake = req.body;
	var emailToCheck = {email: req.body.email}

	mongoose.model('User').checkUserExists(emailToCheck)
		.then(function (exists) {

			if (exists) {
                var error = new Error('User already exists.');
                error.status = 401;
                return next(error);
            } else {

            	delete userToMake.passwordCheck;

            	mongoose.model('User')
            	.create(userToMake, function (error, createdUser) {

            		if (error) return next(error);

            		res.send({message: "You've successfully created a new account!"})
            	})
            }
	}, next)

})