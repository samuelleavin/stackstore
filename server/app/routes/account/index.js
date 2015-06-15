'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};
// members
router.get('/orderHistory', ensureAuthenticated, function (req, res, next) {
	var user = req.session.passport.user;
	mongoose.model('Order').find({ customer: user }).populate('product').exec()
		.then(function(orderList) {
			res.send(orderList);
		}, function(err) {
			next(err);
		});
});
